import React from 'react';

// Định nghĩa filters và categories ngay trong component
export const filters = [
    { label: 'Đồ Nam', value: 'male' },
    { label: 'Đồ Nữ', value: 'female' },
    { label: 'Unisex', value: 'unisex' }
];

export const categories = {
    male: [
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2022/Group_1_2.jpg', title: 'ÁO THUN' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2022/Group_2_2.jpg', title: 'ÁO POLO' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2022/Group_3_2.jpg', title: 'QUẦN SHORT' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2022/Group_4_2.jpg', title: 'QUẦN LÓT' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2022/Group_5_2.jpg', title: 'ĐỒ BƠI' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2022/Group_6_2.jpg', title: 'PHỤ KIỆN' },
    ],
    female: [
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/nu_ao_thun.jpg', title: 'ÁO THUN' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/nu_ao_polo.jpg', title: 'ÁO POLO' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/nu_quan_short.jpg', title: 'QUẦN SHORT' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/nu_quan_lot.jpg', title: 'QUẦN LÓT' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/nu_do_boi.jpg', title: 'ĐỒ BƠI' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/nu_phu_kien.jpg', title: 'PHỤ KIỆN' },
    ],
    unisex: [
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/unisex_ao_thun.jpg', title: 'ÁO THUN' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/unisex_ao_polo.jpg', title: 'ÁO POLO' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/unisex_quan_short.jpg', title: 'QUẦN SHORT' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/unisex_quan_lot.jpg', title: 'QUẦN LÓT' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/unisex_do_boi.jpg', title: 'ĐỒ BƠI' },
        { image: 'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/April2023/unisex_phu_kien.jpg', title: 'PHỤ KIỆN' },
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