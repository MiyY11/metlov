export interface Review {
  id: number
  author: string
  rating: number
  text: string
  date: string
}

export interface Place {
  id: number
  name: string
  category: string
  description: string
  address: string
  rating: number
  reviewsCount: number
  price?: number
  image: string
  reviews: Review[]
}

export interface SuggestedPlace {
  id: number
  name: string
  category: string
  description: string
  address: string
  suggestedBy: string
  status: 'pending' | 'approved' | 'rejected'
}
