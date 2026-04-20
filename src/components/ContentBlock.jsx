import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical, Settings2, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ContentBlock({ block, updateBlock, deleteBlock, isPreview }) {
  const [isEditing, setIsEditing] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.6 : 1,
  };

  const getHeaderSize = (level) => {
    switch(level) {
      case 1: return 'text-3xl md:text-4xl';
      case 2: return 'text-xl md:text-2xl';
      case 3: return 'text-lg md:text-xl';
      case 4: return 'text-base md:text-lg font-bold';
      case 5: return 'text-sm font-bold';
      case 6: return 'text-xs font-bold uppercase';
      default: return 'text-3xl';
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={`relative transition-all duration-300 ${isPreview ? 'mb-4' : 'bg-white border border-gray-200 shadow-sm rounded-xl mb-6 overflow-hidden'}`}>
      
      {!isPreview && (
        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-100">
          <div {...attributes} {...listeners} className="cursor-grab p-2 text-gray-400">
            <GripVertical size={20} />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(!isEditing)} className={`p-2 rounded-lg ${isEditing ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-blue-600'}`}>
              <Settings2 size={16} />
            </button>
            <button onClick={() => deleteBlock(block.id)} className="p-2 bg-white border border-red-100 text-red-500 rounded-lg">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}

      <div className={`${isPreview ? 'p-0' : 'p-4 md:p-8'}`}>
        {isEditing && !isPreview ? (
          <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {block.type === 'header' && (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => updateBlock(block.id, block.content, { ...block.settings, level: num })}
                    className={`w-8 h-8 rounded-lg text-xs font-bold border ${block.settings.level === num ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600'}`}
                  >
                    H{num}
                  </button>
                ))}
              </div>
            )}
            <textarea
              className="w-full p-2 border border-slate-200 rounded-lg text-sm"
              rows="3"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value, block.settings)}
            />
            <button onClick={() => setIsEditing(false)} className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2">
              <Check size={16} /> Done
            </button>
          </div>
        ) : (
          <div onDoubleClick={() => !isPreview && setIsEditing(true)}>
            {block.type === 'header' && <div className={`font-bold text-slate-900 ${getHeaderSize(block.settings.level)}`}>{block.content}</div>}
            {block.type === 'text' && <p className="text-slate-600 leading-relaxed text-sm md:text-lg whitespace-pre-wrap">{block.content}</p>}
            {block.type === 'image' && <img src={block.content} className="w-full rounded-lg" alt="img" onError={(e) => e.target.src='https://via.placeholder.com/400'} />}
            {block.type === 'markdown' && (
              <div className="prose prose-sm max-w-none bg-slate-900 text-blue-100 p-4 rounded-lg font-mono text-xs overflow-x-auto">
              <ReactMarkdown>{block.content}</ReactMarkdown>
              </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}