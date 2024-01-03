import { PanelDelete, PanelEdit } from '@/components/Icons'
import AdminDataList from '@/components/Layout/Admin/DataList'
import apiClient from '@/utils/axios'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'

const PERPAGE = 10

export default function List({ title }) {
  const [meta, setMeta] = useState({})
  const [blogs, setBlogs] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchBlog() {
      const blogs = await apiClient.get('/admin/blog', {
        params: {
          page: router.query.page || 1,
          perpage: PERPAGE,
        },
      })
      setBlogs(
        blogs.data.map(blog => {
          const doc = new DOMParser().parseFromString(blog.content, 'text/html')
          return {
            ...blog,
            content:
              doc.body.textContent.length > 150
                ? `${doc.body.textContent.substring(0, 150)}...`
                : doc.body.textContent,
          }
        })
      )
      setMeta(blogs.meta)
    }

    fetchBlog()
  }, [router.query])

  const pageChanged = event => {
    router.push({
      query: {
        ...router.query,
        page: Number(event.selected) + 1,
      },
    })
  }

  const handleDelete = async slug => {
    const blogs = await apiClient.delete('/admin/blog', {
      data: {
        slug: slug,
      },
    })
  }

  const handleEdit = () => {}

  return (
    <>
      <div className="mb-7">
        <div>{title && <h1 className="text-4xl font-bold">{title}</h1>}</div>
      </div>

      <AdminDataList className="!p-0">
        {blogs.map((data, index) => (
          <div
            key={index}
            className={classNames(
              'flex items-center gap-6 border-t border-solid border-primary-1 px-9 py-4 first:border-t-0 dark:border-darkmode-border max-xs:flex-col'
            )}
          >
            {data.image && (
              <div className="relative w-[129px] shrink-0 max-xs:aspect-square max-xs:w-full sm:h-[108px]">
                <Image
                  fill
                  src={data.image}
                  className="rounded-lg object-cover"
                  alt=""
                />
              </div>
            )}
            <div>
              <h3 className="text-base font-semibold dark:text-darkmode-title">
                {data.title}
              </h3>

              <p className="mt-2 text-sm font-normal text-primary-6 dark:text-darkmode-text">
                {data.content}
              </p>
            </div>

            <div className="flex h-full gap-2">
              <div
                className="cursor-pointer rounded-md border border-primary-1 bg-lineer-light px-1 py-1 font-bold"
                onClick={() => handleDelete(data.slug)}
              >
                <PanelDelete />
              </div>
              <div
                className="cursor-pointer rounded-md border border-primary-1 bg-lineer-light px-1 py-1"
                onClick={handleEdit}
              >
                <PanelEdit />
              </div>
            </div>
          </div>
        ))}
      </AdminDataList>
      <div>
        <ReactPaginate
          onPageChange={pageChanged}
          breakLabel="..."
          initialPage={router.query.page || 1}
          nextLabel=">"
          pageRangeDisplayed={10}
          pageCount={meta.pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          className="pagination mt-10 flex flex-wrap justify-center gap-4 gap-y-7"
        />
      </div>
    </>
  )
}
