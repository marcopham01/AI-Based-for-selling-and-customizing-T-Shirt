import React from 'react'
import Carousel from '../components/Carousel'
import Card from '../components/Card'

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100">
      <Carousel />
      <div className="container mx-auto text-center pt-12 px-4">
        <h1 className="text-3xl font-bold text-blue-600">EXPLORE NEW TRENDING PRODUCTS</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full pb-12 px-4">
        <Card
          image="https://assets.hermes.com/is/image/hermesproduct/h-puzzle-t-shirt-with-leather-detail--557930HA90-worn-1-0-0-800-800_g.jpg"
          title="MEN"
          description="Áo thun nam chất lượng cao"
          onClick={() => window.location.href = '#'}
        />
        <Card
          image="https://assets.hermes.com/is/image/hermesproduct/les-clefs-cropped-t-shirt--5E4624DA02-worn-1-0-0-800-800_g.jpg"
          title="WOMEN "
          description="Áo thun nữ chất lượng cao"
          onClick={() => window.location.href = '#'}
        />
      </div>
    </div>
  )
}
