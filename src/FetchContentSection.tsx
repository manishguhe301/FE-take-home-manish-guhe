import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ContentTable from './components/ContentTable';
import ReactPaginate from 'react-paginate';

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

const FetchContentSection = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    '' | 'posts' | 'comments'
  >('');
  const [optionData, setOptionData] = useState<Post[] | Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const paginatedData = optionData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${selectedOption}`
      );
      const data = await response.json();
      setOptionData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data. Please try again later.');
    }
  };

  useEffect(() => {
    if (selectedOption) {
      fetchData();
    }
  }, [selectedOption]);

  return (
    <div className='my-2 '>
      <div className=' py-1 px-7 bg-[#FFFFFF] w-full'>
        <h3 className='text-lg font-bold text-[#344054]'>Fetch Content</h3>
      </div>
      <div className='px-7 py-4 bg-[#fff] my-2 border border-[#EAECF0] w-fit max-sm:w-full !h-[170px] rounded-lg'>
        <div
          className='bg-[#EEEEEE] pl-5 flex items-center justify-between w-fit gap-16 rounded-lg py-[6px] text-[#525F71] text-lg font-semibold max-sm:w-full'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className='capitalize'>Select content type</span>
          <ChevronDown className='pr-2' size={26} />
        </div>
        {isDropdownOpen && (
          <div className='bg-[#EEEEEE] rounded-lg p-1 my-2 transition-all duration-300 max-sm:w-full'>
            {['posts', 'comments'].map((option) => (
              <div
                key={option}
                className='bg-transparent px-5 py-2 hover:bg-[#D1CFFF] rounded-lg cursor-pointer transition-all duration-300 capitalize'
                onClick={() => {
                  setSelectedOption(option as '' | 'posts' | 'comments');
                  setIsDropdownOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className=' py-4  bg-[#FFFFFF] w-full border border-[#EAECF0] rounded-lg'>
        {isLoading ? (
          <div className='h-[50vh] flex justify-center items-center'>
            <img src='loading-circle.svg' alt='loading' className='w-12 h-12' />
          </div>
        ) : optionData.length > 0 ? (
          <div className='px-6 max-sm:px-2'>
            <ContentTable
              data={paginatedData}
              selectedOption={selectedOption}
            />
            <ReactPaginate
              pageCount={Math.ceil(optionData.length / itemsPerPage)}
              onPageChange={handlePageClick}
              containerClassName='flex px-6 gap-2 mt-4 max-sm:px-2 max-sm:overflow-x-auto max-sm:w-full'
              pageClassName='mx-5 cursor-pointer max-sm:mx-2'
              activeClassName='text-black font-bold'
              previousLabel={<ChevronLeft size={24} color='#888888' />}
              nextLabel={<ChevronRight size={24} color='#888888' />}
              breakLabel='...'
              previousClassName='mr-5 cursor-pointer max-sm:mr-2'
              nextClassName='ml-5 cursor-pointer max-sm:ml-2'
              disabledClassName='opacity-50 cursor-not-allowed'
            />
          </div>
        ) : (
          <div className='bg-[#fff] border border-[#EAECF0] rounded-lg p-4 px-6 my-2'>
            <p className='text-[#344054] text-lg font-semibold'>
              No content available. Please select an option to fetch content.
            </p>
          </div>
        )}
      </div>
      {optionData.length > 0 && (
        <div className='flex justify-center pb-5'>
          <button className='bg-[#D1CFFF] text-[#000000] px-9 py-[14px] rounded-lg flex justify-center items-center text-2xl mt-2 text-center font-semibold'>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default FetchContentSection;
