// --- Component: src/components/InputField.jsx ---
import React from "react";
// Lucide icons are imported in the consuming component (LoginForm or App for the combined file)
// Since this is a standalone file, we'll keep the required props clear.

const InputField = ({
    label,
    type = "text",
    value,
    onChange,
    icon: Icon,
    placeholder,
}) => {
    // Custom CSS variables from index.css are used by Tailwind classes (e.g., text-gray-400)
    // The custom-input class applies the specific focus styles defined in index.css
    return (
        <div>
            <label className='text-gray-400 text-sm font-medium block mb-2'>
                {label}
            </label>
            <div className='relative'>
                {/* Render the Lucide Icon passed as a prop */}
                {Icon && (
                    <Icon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500' />
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    // The 'custom-input' class pulls in the focus ring/border style from index.css
                    className={`w-full bg-black border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white font-normal placeholder:text-gray-600 transition duration-200 ease-in-out custom-input`}
                />
            </div>
        </div>
    );
};

export default InputField;
