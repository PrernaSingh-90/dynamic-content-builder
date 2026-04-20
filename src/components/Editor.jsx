import React from 'react';
import { X, Type, Image as ImageIcon, AlignLeft } from 'lucide-react';

export default function Editor({ block, onClose, onUpdate }) {
  if (!block) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl border-l border-gray-200 z-100 p-6 transform transition-transform duration-300">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-gray-800">Block Settings</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Content Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 items-center gap-2">
            <Type size={16} /> Content / URL
          </label>
          {block.type === 'text' || block.type === 'markdown' ? (
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32 text-sm"
              value={block.content}
              onChange={(e) => onUpdate(block.id, e.target.value, block.settings)}
            />
          ) : (
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              value={block.content}
              onChange={(e) => onUpdate(block.id, e.target.value, block.settings)}
            />
          )}
        </div>

        {/* Header Specific Settings */}
        {block.type === 'header' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Header Level</label>
            <select 
              className="w-full p-2 border rounded-lg text-sm"
              value={block.settings.level || 1}
              onChange={(e) => onUpdate(block.id, block.content, { ...block.settings, level: parseInt(e.target.value) })}
            >
              <option value="1">H1 - Extra Large</option>
              <option value="2">H2 - Large</option>
              <option value="3">H3 - Medium Large</option> 
              <option value="4">H4 - Medium</option>
              <option value="5">H5 - Small</option>
              <option value="6">H6 - Extra Small</option>
            </select>
          </div>
        )}

        {/* Color Picker for all */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
          <input 
            type="color" 
            className="w-full h-10 p-1 border rounded-lg cursor-pointer"
            value={block.settings.color || '#000000'}
            onChange={(e) => onUpdate(block.id, block.content, { ...block.settings, color: e.target.value })}
          />
        </div>
      </div>

      <button 
        onClick={onClose}
        className="w-full mt-10 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </div>
  );
}
