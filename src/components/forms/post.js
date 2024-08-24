import { Suspense } from 'react'
import Categories from '../Categories';
import TipTap from '@/components/TipTap';
import Imagen from '@/components/imagen'
import Button from '../button-form';

function Form({ children, action, title, post, disabled }) {

  return (
    <div className="p-4">
      <form action={action} className="w-full max-w-full px-4">
        <input type='hidden' name='id' value={post?.id} />
        <fieldset disabled={disabled} className="space-y-4">

          <div className='flex flex-col md:flex-row md:gap-10'>
            <Imagen imgUrl={post?.image || '/blog-logo.png'} className="w-full md:w-1/3 object-cover" />
            {/* <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <label htmlFor='image' className="w-full md:w-1/4">Image</label>
            <input type='text' id='image' name='image'
              placeholder='Image'
              defaultValue={post?.image}
              className="w-full md:w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
            />
          </div> */}

            <div className='w-full md:w-2/3'>
              <div className="flex flex-col md:flex-row items-center md:space-x-4">
                <label htmlFor='author' className="w-full md:w-1/4">Author</label>
                <input type='text' id='author' name='author'
                  placeholder='Author'
                  defaultValue={post?.author}
                  className="w-full md:w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                  autoFocus
                />
              </div>

              <div className="flex flex-col md:flex-row items-center md:space-x-4">
                <label htmlFor='title' className="w-full md:w-1/4">Title</label>
                <input type='text' id='title' name='title'
                  placeholder='Title'
                  defaultValue={post?.title}
                  className="w-full md:w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
                />
              </div>
            </div>
          </div>

          <div className='mt-30'>
            <TipTap contenido={post?.post} />
          </div>

          {children}
          <div className="hidden">
            <label htmlFor='slug'>Slug</label>
            <input
              type='text'
              id='slug'
              name='slug'
              placeholder='Slug'
              defaultValue={post?.slug}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor='views'>Views</label>
            <input
              type='number'
              id='views'
              name='views'
              min={0}
              placeholder='Views'
              defaultValue={post?.views}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
            />
          </div>
          <Suspense fallback={'Loading ...'}>
            <Categories postId={post?.id} disabled={disabled} />
          </Suspense>
        </fieldset>
        <Button title={title} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 hover:text-gray-100" />

        {/* <button type='submit' className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 hover:text-gray-100">{title}</button> */}
      </form>
    </div>
  )
}

export default Form
