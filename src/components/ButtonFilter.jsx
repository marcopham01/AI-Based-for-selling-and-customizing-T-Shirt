import React from 'react';

// Định nghĩa filters và categories ngay trong component
export const filters = [
    { label: 'Đồ Nam', value: 'male' },
    { label: 'Đồ Nữ', value: 'female' },
    { label: 'Unisex', value: 'unisex' }
];

export const categories = {
    male: [
        { image: 'https://lados.vn/wp-content/uploads/2024/12/1-NAU-LD9202.jpg', title: 'ÁO THUN' },
        { image: 'https://product.hstatic.net/1000312752/product/548e103d31d2952b748f18f04406a434_37d5015da5cd409790f296c97c279909_89c4cdbacbc647a9a61c1b22fb4fa7b4.png', title: 'ÁO POLO' },
        { image: 'https://thoitrangbigsize.vn/wp-content/uploads/2025/04/mau-kaki-8.jpg', title: 'QUẦN SHORT' },        
        { image: 'https://product.hstatic.net/200000805635/product/quan_boi_455f3cc904424b0bb3f447a49dc6d0b9.png', title: 'ĐỒ BƠI' },
    ],
    female: [
        { image: 'https://lados.vn/wp-content/uploads/2024/12/1-NAU-LD9202.jpg', title: 'ÁO THUN' },
        { image: 'https://product.hstatic.net/1000362402/product/aplt226-2__6__c7ec91513e774634b9431a3ee75fbbb7_dd11394601bd4428ad4ba13992921df3_master.jpg', title: 'ÁO POLO' },
        { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO5enCsIiw_KLpvGpGmd3Gifw3amIyz_vJvQ&s', title: 'QUẦN SHORT' },   
        { image: 'https://www.bhswim.com/images/thumbs/0003190_do-boi-nu-dang-vay-yingfa-y2285_550.jpeg', title: 'ĐỒ BƠI' },

    ],
    unisex: [
        { image: 'https://lados.vn/wp-content/uploads/2024/12/1-NAU-LD9202.jpg', title: 'ÁO THUN' },
        { image: 'https://bizweb.dktcdn.net/100/340/361/products/548e103d31d2952b748f18f04406a4.png?v=1722053332680', title: 'ÁO POLO' },
        { image: 'https://yeepvn.sgp1.digitaloceanspaces.com/2023/04/ec76ae22ff328c4f4d006b61ca9d05aa.jpg', title: 'QUẦN SHORT' },
    ],
};

/**
 * props:
 * - selected: value hiện tại
 * - onChange: function(value)
 */
const ButtonFilter = ({ selected, onChange }) => {
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                {filters.map((filter) => (
                    <button
                        key={filter.value}
                        onClick={() => onChange(filter.value)}
                        style={{
                            padding: '12px 32px',
                            borderRadius: 24,
                            border: 'none',
                            background: selected === filter.value ? '#000' : '#eee',
                            color: selected === filter.value ? '#fff' : '#000',
                            fontWeight: 600,
                            fontSize: 18,
                            cursor: 'pointer',
                            outline: 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
            {categories[selected] && (
                <div className="flex flex-col md:flex-row flex-wrap justify-center items-stretch gap-6 w-full pb-12 px-4 mt-8">
                    {categories[selected].map((cat, idx) => (
                        <div
                            key={cat.title + idx}
                            onClick={() => window.location.href = '#'}
                            className="flex flex-col items-center cursor-pointer transition-transform duration-200 hover:-translate-y-2"
                            style={{ width: 220 }}
                        >
                            <div
                                className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 bg-white"
                                style={{ width: 220, height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <img src={cat.image} alt={cat.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                            </div>
                            <div className="mt-4 text-lg font-bold text-black text-center uppercase tracking-wide">
                                {cat.title}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ButtonFilter; 