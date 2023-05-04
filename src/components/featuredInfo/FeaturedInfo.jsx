import React from 'react'
import './featuredInfo.css'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../utils/requestMethods'

export default function FeaturedInfo() {
  const [income, setIncome] = useState(0)
  const [perc, setPerc] = useState(0)
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await axiosInstance.get('orders/income')
        if (res.status) {
          const total = res.data[0].total
          setIncome(total)
          setPerc((total * 100) / total - 100)
        }
      } catch {}
    }
    getIncome()
  }, [])

  console.log('income', income)

  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Revenue</span>
        <div className='featuredMoneyContainer'>
          <div className='featuredMoney'>{income || 0}</div>
          <span className='featuredMoneyRate'>
            %{Math.floor(perc)}
            {perc < 0 ? (
              <ArrowDownward className='featuredIcon negative' />
            ) : (
              <ArrowUpward className='featuredIcon' />
            )}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month 1</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Sales</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>$4,415</span>
          <span className='featuredMoneyRate'>
            -1.4 <ArrowDownward className='featuredIcon negative' />
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Cost</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>$2,225</span>
          <span className='featuredMoneyRate'>
            +2.4 <ArrowUpward className='featuredIcon' />
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
    </div>
  )
}
