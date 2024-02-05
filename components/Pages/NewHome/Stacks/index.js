import NewCard from '@/components/Card/NewCard'
import React, { useState } from 'react'
import StacksCard from './StacksCard'
import NewChip from '@/components/Common/NewChip'
import ComponentHeader from '../ComponentHeader'

const STACKS = [
  [
    {
      name: 'Flutter',
      image: '/img/stacks/flutter.svg',
    },
    {
      name: 'Java',
      image: '/img/stacks/java.svg',
    },
    {
      name: 'C',
      image: '/img/stacks/c.svg',
    },
  ],
  [
    {
      name: 'Firebase',
      image: '/img/stacks/firebase.svg',
    },
  ],
]

export default function Stacks() {
  const getAllData = () => {
    setStack(STACKS)
  }

  const [stack, setStack] = useState(STACKS.filter((data, index) => index < 2))
  return (
    <NewCard className="px-0" id="stacks" data-name="Stacks">
      <div className="px-9">
        <ComponentHeader
          title="Stack"
          description="Software and resources I use on a regular basis."
        />
      </div>

      <div className="mt-10">
        <div className=" border-t border-primary-1 dark:border-darkmode-border">
          {stack.map((stackGroup, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-4 border-b border-primary-1 px-9 py-9 dark:border-darkmode-border max-sm:grid-cols-2 max-sm:gap-8 max-xs:grid-cols-1"
            >
              {stackGroup.map((stack, index) => (
                <StacksCard
                  className="justify-self-start border-primary-1 dark:border-darkmode-border max-sm:justify-self-start"
                  key={index}
                  data={stack}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </NewCard>
  )
}
