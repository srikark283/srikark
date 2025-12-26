interface GitHubRepo {
  stargazers_count: number
  name: string
  full_name: string
  description: string
  language: string
  html_url: string
  created_at: string
  updated_at: string
}

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  login: string
  name: string
  bio: string
  avatar_url: string
}

interface GitHubStats {
  totalStars: number
  totalRepos: number
  totalContributions: number
  languages: string[]
  repos: GitHubRepo[]
}

// Cache for GitHub data (5 minutes)
let cachedData: { data: GitHubStats; timestamp: number } | null = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Function to clear cache (useful for development)
export const clearGitHubCache = () => {
  cachedData = null
}

export const fetchGitHubStats = async (username: string): Promise<GitHubStats> => {
  // Check cache first
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data
  }

  // Optional: Get token from environment variable for higher rate limits
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    // Fetch user info
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers,
    })

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`)
    }

    const user: GitHubUser = await userResponse.json()

    // Fetch all repositories (paginated)
    let allRepos: GitHubRepo[] = []
    let page = 1
    const perPage = 100

    while (true) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc`,
        {
          headers,
        }
      )

      if (!reposResponse.ok) {
        throw new Error(`GitHub API error: ${reposResponse.status}`)
      }

      const repos: GitHubRepo[] = await reposResponse.json()

      if (repos.length === 0) break

      allRepos = [...allRepos, ...repos]
      
      // If we got less than perPage, we're done
      if (repos.length < perPage) break
      
      page++
    }

    // Calculate total stars
    const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0)

    // Get unique languages
    const languages = Array.from(
      new Set(allRepos.map((repo) => repo.language).filter(Boolean))
    ) as string[]

    // For contributions, we'll use a placeholder since GitHub's contribution API requires authentication
    // You can use GitHub's GraphQL API with a token for this, or use a service like GitHub Readme Stats
    const totalContributions = 0 // This would need GitHub GraphQL API or external service

    const stats: GitHubStats = {
      totalStars,
      totalRepos: user.public_repos,
      totalContributions,
      languages,
      repos: allRepos,
    }

    // Cache the data
    cachedData = {
      data: stats,
      timestamp: Date.now(),
    }

    return stats
  } catch (error) {
    console.error('Error fetching GitHub stats:', error)
    throw error
  }
}

// Fetch contribution count using GitHub's GraphQL API (requires token)
export const fetchGitHubContributions = async (
  username: string,
  token?: string
): Promise<number> => {
  if (!token) {
    // Without token, return 0 or use a fallback
    return 0
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalCommitContributions
          totalIssueContributions
          totalPullRequestContributions
          totalPullRequestReviewContributions
        }
      }
    }
  `

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    })

    if (!response.ok) {
      throw new Error(`GitHub GraphQL API error: ${response.status}`)
    }

    const data = await response.json()
    const contributions =
      data.data?.user?.contributionsCollection?.totalCommitContributions || 0

    return contributions
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error)
    return 0
  }
}

// Alternative: Use GitHub Readme Stats API (no token required, but less accurate)
export const fetchGitHubContributionsFromReadmeStats = async (
  username: string
): Promise<number> => {
  try {
    // This uses the GitHub Readme Stats service
    // Note: This is a third-party service and may have rate limits
    const response = await fetch(
      `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&hide_title=true&hide=prs,issues&count_private=true`
    )

    // This is a workaround - the readme stats API returns an image
    // For actual contribution count, you'd need to parse the image or use GraphQL
    // For now, we'll return a placeholder
    return 0
  } catch (error) {
    console.error('Error fetching contributions from readme stats:', error)
    return 0
  }
}
