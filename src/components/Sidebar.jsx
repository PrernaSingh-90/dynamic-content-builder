import React from 'react';
import { Type, Image as ImageIcon, Layout, FileText, Plus } from 'lucide-react';

const BLOCK_TYPES = [
  { type: 'header', label: 'Header Block', icon: <Layout className="w-5 h-5" />, desc: 'Customizable heading' },
  { type: 'text', label: 'Rich Text', icon: <Type className="w-5 h-5" />, desc: 'Paragraph content' },
  { type: 'image', label: 'Image Block', icon: <ImageIcon className="w-5 h-5" />, desc: 'Display via URL' },
  { type: 'markdown', label: 'Markdown', icon: <FileText className="w-5 h-5" />, desc: 'Code/Markdown preview' },
];

export default function Sidebar({ addBlock }) {
  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 h-auto md:h-screen p-6 overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800">Content Blocks</h2>
        <p className="text-sm text-gray-500">Click a block to add it to your page</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {BLOCK_TYPES.map((item) => (
          <button
            key={item.type}
            onClick={() => addBlock(item.type)}
            className="group flex items-start gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
          >
            <div className="p-2 bg-gray-100 group-hover:bg-blue-100 rounded-lg text-gray-600 group-hover:text-blue-600">
              {item.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">{item.label}</span>
                <Plus size={14} className="text-gray-400 group-hover:text-blue-500" />
              </div>
              <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 p-4 bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg shadow-blue-200">
        <h4 className="font-semibold mb-1">Tip:</h4>
        <p className="text-xs opacity-80">You can drag and reorder blocks on the canvas to change the layout!</p>
      </div>
    </aside>
  );
}
