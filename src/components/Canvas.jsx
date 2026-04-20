import React from 'react';
import ContentBlock from './ContentBlock';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function Canvas({ blocks, updateBlock, deleteBlock }) {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {blocks.map((block) => (
            <ContentBlock 
              key={block.id} 
              block={block} 
              updateBlock={updateBlock} // <--- YE LINE ZAROORI HAI
              deleteBlock={deleteBlock} 
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}