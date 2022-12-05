type Post = {
  slug: string
  images?: string[]
  title: string
  readingTime: {
    text: string
  }
  date: string
  summary: string
  tags: string[]
}

export default Post
