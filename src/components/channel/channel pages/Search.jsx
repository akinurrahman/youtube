import React from 'react'
import ChannelLayout from '../ChannelLayout'
import useChannelStatistics from '../../../hooks/useChannelStatistics'

const Search = () => {
  useChannelStatistics()
  return (
    <ChannelLayout>
      thsi is search
    </ChannelLayout>
  )
}

export default Search
