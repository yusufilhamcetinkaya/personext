import NewCard from '@/components/Card/NewCard'
import React from 'react'
import StackCard from './StackCard'
import NewChip from '@/components/Common/NewChip'

export default function Stack() {
  return (
    <NewCard className="px-0">
      <div className="px-9">
        <h2 className="text-lg font-semibold ">Stack</h2>
        <p className="mt-2 text-sm font-normal text-primary-6">
          Software and resources I use on a regular basis.
        </p>
      </div>

      <div className="gap- mt-10 flex flex-col ">
        <div className="border- flex justify-between gap-5 border-t border-primary-1 px-9 py-9">
          <StackCard />
          <StackCard />
          <StackCard />
        </div>
        <div className="border- flex justify-between gap-5 border-b border-t border-primary-1 px-9 py-9">
          <StackCard />
          <StackCard />
          <StackCard />
        </div>
      </div>

      <NewChip
        as="button"
        className="ml-11 mt-9 px-4 py-1 text-sm text-primary-6"
      >
        View All Stack
      </NewChip>
    </NewCard>
  )
}
