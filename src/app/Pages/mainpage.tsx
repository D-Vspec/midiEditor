import React from "react";

const MainPage = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            
            <div className="flex flex-row h-[5vh] bg-gray-900"></div>
            <div className="flex flex-row h-[60vh] bg-gray-900">
              
                 <div className="flex flex-col w-[15%] bg-blue-500">
                 <div className="flex flex-col h-[10%] bg-blue-500">
                  </div>

                    <div className="flex flex-col h-[90%] bg-blue-500 overflow-y-scroll">
                    </div>

                  </div>
               

                  <div className="flex flex-col w-[85%] bg-blue-300 overflow-y-scroll">
                  </div>
            </div>
        </div>
    );
}

export default MainPage;
