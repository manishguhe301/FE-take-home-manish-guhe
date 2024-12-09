import React from 'react';
import { Comment, Post } from '../FetchContentSection';

const ContentTable = ({
  data,
  selectedOption,
}: {
  data: Post[] | Comment[];
  selectedOption: string;
}) => {
  return (
    <div className='px-7 max-sm:px-2'>
      <h4 className='text-lg font-bold text-[#344054] mb-3'>
        Displaying Content
      </h4>

      <table className='w-full border-collapse'>
        <thead>
          <tr className='border-2  border-[#EAECF0]'>
            <th className='uppercase py-3 w-[30%]   text-center text-[#525F71]'>Id</th>
            <th className='capitalize py-3 text-left text-[#525F71] '>
              {selectedOption === 'posts' ? 'Title' : 'Name'}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: Post | Comment, index: number) => (
            <tr
              key={item.id}
              className={`${
                index % 2 === 0 ? 'bg-[#F9FAFB] border ' : 'bg-[#fff]'
              } border-2  border-[#EAECF0]`}
            >
              <td className='py-3 text-sm font-normal text-center'>
                {item.id}
              </td>
              <td className='py-3 text-sm font-normal'>
                {'title' in item ? item.title : item.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentTable;
