"use client"
import { useFilter } from '@/context/FilterContext';
import { ICategory } from '@/types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface Props{
    categories: ICategory[]
}
export default function Dropdown({categories} : Props) {
    const {
        selectedCategoryName,
        setSelectedCategoryName,
        setSelectedCategory,
        setIsSubCategory,
        isSubCategory
      } = useFilter();

    const handleOnClickCategory = (category) =>{
        setSelectedCategory(category._id)
        setSelectedCategoryName(category.name)
        setIsSubCategory(false)
    }

    const handleOnClickSubCategory = (category) =>{
        setSelectedCategory(category._id)
        setSelectedCategoryName(category.name)
        setIsSubCategory(true)
    }

    return (
        <Menu as="div" className="w-full relative inline-block text-left">
        <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            {selectedCategoryName ? selectedCategoryName : "Todos"}
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
            </MenuButton>
        </div>

        <MenuItems
            transition
            className="h-[300px] overflow-y-scroll absolute  z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
            <div className='py-1'>
                <MenuItem>
                    <button
                    onClick={() => handleOnClickCategory({_id: null, name: "Todos"})}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                    >
                    Todos
                    </button>
                </MenuItem>
            </div>
            {categories.map(category =>{
                return (
                    <div key={category._id} className="py-1">
                        <MenuItem>
                            <button
                            onClick={() => handleOnClickCategory(category)}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                            {category.name}
                            </button>
                        </MenuItem>
                        {category.subCategories.map(subCategory =>{
                            return(
                                <MenuItem key={subCategory._id}>
                                    <button
                                    onClick={() => handleOnClickSubCategory(subCategory)}
                                    className="w-full text-left  block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                    >
                                    {subCategory.name}
                                    </button>
                                </MenuItem>
                            )
                        })}
                    </div>
                )
            })}
        </MenuItems>
        </Menu>
  )
}
