import React from 'react';
import "../Fonts/Fonts.css";

export const About = () => {
  return (
    <div className="min-h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(/images/dark-concrete-texture-background.jpg)' }}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md p-8 bg-gradient-to-b from-white via-white to-gray-200 rounded-lg shadow-md">
          <h2 className="my-custom-font text-2xl font-bold mb-4 text-center">About Our Application</h2>
          <p className='my-custom-font'>
            Welcome to Buildos! This is a platform where users can manage work orders, relationships with contractors,
            and reviews. Whether you're a customer looking for contractors or a contractor managing your projects,
            our application has you covered.
          </p><br/>
          <p className='my-custom-font'> This application was built with the customer and contractor in mind. Establishing a 
          trustworthy connection can be difficult for both parties, but wouldn't it be nice to have an outlet where you can see all the 
          options and experts at once?</p><br/>
          <p className='my-custom-font'>
            Feel free to explore the features and functionalities provided. If you have any questions or need
            assistance, don't hesitate to reach out to our support team.
          </p>
        </div>
      </div>
    </div>
  );
};