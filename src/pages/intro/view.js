import React from 'react'
import { useRouter } from 'next/router'

const View = () => {
  const router = useRouter()
  const { lang } = router.query;
  console.log(lang)
  return (
    <div>View</div>
  )
}

export default View;