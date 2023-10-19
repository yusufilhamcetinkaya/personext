import { BLOG_FOLDER_PATH, JSON_BLOG_PATH } from '@/constrait'

const fs = require('fs').promises
const path = require('path')

export const getBlogsFilesData = async jsonBlogArray => {
  // return json blog data
  const blogs = []

  for (const { file } of jsonBlogArray) {
    if (path.extname(file) === '.md') {
      const mdFilePath = path.join(BLOG_FOLDER_PATH, file)
      const content = await fs.readFile(mdFilePath, 'utf8')

      blogs.push({
        slug: decodeURIComponent(file.split('.')[0]),
        attributes: content,
      })
    }
  }
  return blogs
}

export const getFileData = async (file, pathValue) => {
  //return data content
  const dynamicPathValue = pathValue || 'data'
  const filePath = path.join(process.cwd(), dynamicPathValue, file)
  const fileData = await fs.readFile(filePath, 'utf-8')
  return fileData
}

export const getUserFileData = async () => {
  //return user data
  const userData = getFileData('user.md')
  return userData
}

export const getBlogBySlugData = async slug => {
  //return file content based on slug name
  const blogData = getFileData(`${slug}.md`, 'data/blogs')
  return blogData
}

export const readJsonFileData = async () => {
  //return blogs.json
  const fileContents = await fs.readFile(JSON_BLOG_PATH, 'utf8')
  const jsonData = JSON.parse(fileContents)
  return jsonData
}

export const getBlogFileJsonData = async ({ perpage, page, queryTag }) => {
  //return paging blog data
  var jsonData = await readJsonFileData()

  jsonData = jsonData.filter(data => data.listVisible !== false)

  if (queryTag) {
    jsonData = jsonData.filter(data =>
      data.tags.find(blogTag => blogTag.key === queryTag)
    )
  }

  const startIndex = (page - 1) * perpage
  const endIndex = startIndex + perpage
  const jsonBlogArray = jsonData.slice(startIndex, endIndex)
  var blogs = await getBlogsFilesData(jsonBlogArray)

  return {
    data: blogs,
    meta: {
      total: jsonData.length,
      perpage,
      pageCount: Math.ceil(jsonData.length / perpage),
      page,
    },
  }
}
