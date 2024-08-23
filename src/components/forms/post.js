import { Suspense } from 'react'
import Categories from '../Categories';
import TipTap from '../TipTap';

function Form({ children, action, title, post, disabled }) {

  return (
    <div className="p-4">
      <form action={action} className="w-full max-w-full px-4">
        <input type='hidden' name='id' value={post?.id} />
        <fieldset disabled={disabled} className="space-y-4">
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
          <div className="flex flex-col md:flex-row items-center md:space-x-4">
            <label htmlFor='image' className="w-full md:w-1/4">Image</label>
            <input type='text' id='image' name='image'
              placeholder='Image'
              defaultValue={post?.image}
              className="w-full md:w-3/4 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
            />
          </div>
          <label htmlFor='post'>Post</label>
          <TipTap contenido={post?.post} />

          {children}
          <div className="flex flex-col">
            <label htmlFor='slug'>Slug</label>
            <input type='text' id='slug' name='slug'
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
              min='0'
              placeholder='Views'
              defaultValue={post?.views}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400 bg-gray-100"
              disabled
            />
          </div>
          <Suspense fallback={'Loading ...'}>
            <Categories postId={post?.id} disabled={disabled} />
          </Suspense>
        </fieldset>
        <button type='submit' className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 hover:text-gray-100">{title}</button>
      </form>
    </div>
  )
}

export default Form
