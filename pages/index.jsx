import Highlights from '@/components/NewHome/Highlights'
import Publications from '@/components/NewHome/Publications'
import Stacks from '@/components/NewHome/Stacks'
import Gallery from '@/components/NewHome/Galleries'
import Experience from '@/components/NewHome/Experiences'
import FollowMe from '@/components/NewHome/FollowMe'
import Profile from '@/components/NewHome/Profile'
import NewAppLayout from '@/layouts/NewAppLayout'
import {
  getUserService,
  getBlogJsonService,
  getPablicationsData,
} from '@/services/md.services'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SelectedProjects from '@/components/NewHome/SelectedProjects'
import Blogs from '@/components/NewHome/Blogs'
import apiClient from '@/utils/axios'
import { useEffect, useState } from 'react'
import { useUser } from '@/context/user'

const PERPAGE = 7

export async function getServerSideProps({ query, locale }) {
  const { page, tag } = query

  const articles = await getPablicationsData({ name: 'articles' })
  const user = await getUserService()
  const { data, meta } = await getBlogJsonService({
    perpage: PERPAGE,
    page: page || 1,
    tag: tag,
  })

  return {
    props: {
      user: user,
      blogs: data,
      articles,
      meta: meta,
      ...(await serverSideTranslations(locale ?? 'en')),
    },
  }
}

export default function NewDesign({
  user = {},
  blogs = [],
  articles = [],
  meta = {},
  errors,
}) {
  const [blogState, setBlogState] = useState(blogs)

  const { updateUser } = useUser()

  useEffect(() => {
    updateUser(user)
  }, [])

  const getMoreBlogData = async () => {
    const newBlogs = await apiClient.get('/blog', {
      params: {
        page: meta.page + 1,
        perpage: PERPAGE,
      },
    })

    setBlogState(prev => [...prev, ...newBlogs.data])
  }

  return (
    <NewAppLayout>
      <section
        id="container"
        className="mx-auto flex max-w-[620px] flex-col gap-9 pb-24 pt-9 max-sm:pt-28"
      >
        <Profile data={user} />

        {/* <Highlights /> */}

        <Publications data={articles} />

        <Stacks />

        {/* <Gallery /> */}

        <Experience />

        <SelectedProjects />

        <Blogs data={blogState} getMoreBlogData={getMoreBlogData} />

        <FollowMe data={user.socials} />
      </section>
    </NewAppLayout>
  )
}
