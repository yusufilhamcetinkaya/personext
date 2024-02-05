import NewCard from '@/components/Card/NewCard'
import NewChip from '@/components/Common/NewChip'
import React from 'react'
import ExperienceCard from './ExperiencesCard'
import ComponentHeader from '../ComponentHeader'
import classNames from 'classnames'

const EXPERIENCES = [
  {
    company: 'Fabrikod',
    description:
      'Developing mobile application using Flutter/Dart technologies.',
    date: '12/2022 - Present',
    position: 'Mobile Application Developer',
  },
]

export default function Experiences() {
  return (
    <NewCard className="px-0" id="experiences" data-name="Experiences">
      <div className="px-9">
        <ComponentHeader
          title="Experience"
          description="Software Development abilities"
        />
      </div>

      <div className="mt-10 flex flex-col">
        {EXPERIENCES.map((experience, index, array) => (
          <ExperienceCard
            data={experience}
            key={index}
            className={classNames(index === array.length - 1 && 'border-b')}
          />
        ))}
      </div>

      <NewChip
        as="a"
        href="/cv.pdf"
        className="button ml-11 mt-9 inline-block px-4 py-1 text-xs text-primary-6 dark:bg-lineer-nav-link"
      >
        Download Resume
      </NewChip>
    </NewCard>
  )
}
