import { filterOptions } from '@/config'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = ({ filters, handleFilters }) => {
    return (
        <div className='bg-background rounded-lg shadow-sm'>
            <div className='p-4 border-b'>
                <h2 className='text-lg font-extrabold'>Filters</h2>
            </div>
            <div className='p-4 space-y-4'>
                {
                    Object.keys(filterOptions).map(keyItem =>
                        <Fragment key={keyItem}>
                            <div>
                                <h3 className='text-base font-bold'>{keyItem}</h3>
                                <div className='grid gap-2 mt-2'>
                                    {
                                        filterOptions[keyItem].map((option, index) => (
                                            <Label className='flex items-center gap-2 font-medium' key={option.id}>
                                                <Checkbox
                                                    onCheckedChange={() => handleFilters(keyItem, option.id)}
                                                    checked={
                                                        filters && Object.keys(filters).length > 0 &&
                                                        filters[keyItem] && filters[keyItem].indexOf(option.id) > -1
                                                    }
                                                />
                                                {option.label}
                                            </Label>)
                                        )
                                    }
                                    <Separator />
                                </div>
                            </div>
                        </Fragment>)
                }
            </div>
        </div>
    )
}

export default ProductFilter