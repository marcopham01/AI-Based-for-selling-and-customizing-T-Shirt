import React from 'react';

const Card = ({ image, title, description, onClick }) => {
    return (
        <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white flex flex-col justify-end min-h-[300px] md:min-h-[500px] group w-full   mx-auto">
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover object-top z-0 transition-transform duration-500 group-hover:scale-110"
            />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                <p className="text-white mb-6">{description}</p>
                <button
                    onClick={onClick}
                    className="bg-white text-black font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-200 transition w-fit"
                >
                    Xem thêm
                </button>
            </div>
        </div>
    );
};

export default Card; 