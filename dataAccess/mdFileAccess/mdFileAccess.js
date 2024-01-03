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
      const slug = file.split('.')[0]
      blogs.push({
        slug: slug,
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

export const getPulicationsFileData = async () => {
  //return publications data
  const publicationsData = getFileData('publications.md')
  return publicationsData
}

export const getBlogBySlugData = async slug => {
  //return file content based on slug name
  const blogData = getFileData(`${slug}.md`, 'data/blogs')
  return blogData
}

export const readJsonFileData = async () => {
  //return blogs.json
  // const data = require(JSON_BLOG_PATH)
  // console.log('datadata', data)
  // const fileContents = await fs.readFile(JSON_BLOG_PATH, 'utf8')
  // const jsonData = JSON.parse(fileContents)
  // return jsonData

  const fileContents = require('@/data/blogs.json')
  return fileContents
}

export const readJsonFileDataBySlug = async slug => {
  var jsonData = await readJsonFileData()
  const findJsonData = jsonData.find(
    ({ file }) => file.split('.')[0] === slug.split('/')[1]
  )
  return findJsonData
}

export const getBlogFileJsonData = async ({ perpage, page, queryTag }) => {
  //return paging blog data
  var jsonData = await readJsonFileData()

  jsonData = jsonData.filter(
    data => data.listVisible !== false && !Boolean(data.deletedAt)
  )

  if (queryTag) {
    jsonData = jsonData.filter(data =>
      data.tags.find(blogTag => blogTag.key === queryTag)
    )
  }

  const PERPAGE = perpage || jsonData.length
  const startIndex = (page - 1) * PERPAGE
  const endIndex = startIndex + PERPAGE
  const jsonBlogArray = jsonData.slice(startIndex, endIndex)
  var blogs = await getBlogsFilesData(jsonBlogArray)

  return {
    data: blogs,
    meta: {
      total: jsonData.length,
      perpage: PERPAGE,
      pageCount: Math.ceil(jsonData.length / PERPAGE),
      page,
    },
  }
}

export const getSettingsFileData = async () => {
  const settingData = await getFileData('settings.md')
  return settingData
}

export const deletedBlogFile = async jsonBlogs => {
  await fs.writeFile(
    path.join(JSON_BLOG_PATH),
    JSON.stringify(jsonBlogs),
    err => {
      if (err) {
        console.error('JSON file write error:', err)
        return
      }
    }
  )
}
