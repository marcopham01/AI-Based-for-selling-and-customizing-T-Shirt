import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumb({ items }) {
    return (
        <nav className="text-sm mb-4">
            <ol className="list-reset flex text-gray-600">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-center">
                        {item.href ? (
                            <Link to={item.href} className="hover:underline">{item.label}</Link>
                        ) : (
                            <span className="font-semibold text-black">{item.label}</span>
                        )}
                        {idx < items.length - 1 && <span className="mx-2">/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    );
} 