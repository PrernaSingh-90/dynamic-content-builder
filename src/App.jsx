import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Navbar from './components/Navbar';

export default function App() {
  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem('builder-data');
    return saved ? JSON.parse(saved) : [];
  });
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    localStorage.setItem('builder-data', JSON.stringify(blocks));
  }, [blocks]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setBlocks((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addBlock = (type) => {
    const uniqueId = `block-${Date.now()}`;
    const newBlock = {
      id: uniqueId,
      type,
      content: type === 'header' ? 'New Heading' : type === 'image' ? `https://picsum.photos/seed/${uniqueId}/800/400` : 'New Content',
      settings: { level: 1 }
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id, newContent, newSettings) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content: newContent, settings: newSettings } : b));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full">
      <Navbar isPreview={isPreview} setIsPreview={setIsPreview} />

      <div className="flex flex-1 flex-col md:flex-row overflow-hidden relative">
        {!isPreview && (
          <div className="w-full md:w-80 shrink-0 bg-white border-b md:border-r border-gray-200 overflow-y-auto">
            <Sidebar addBlock={addBlock} />
          </div>
        )}

        <main className={`flex-1 overflow-y-auto p-4 md:p-10 ${isPreview ? 'bg-white' : 'bg-slate-50'}`}>
          <div className="max-w-3xl mx-auto">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <Canvas 
                blocks={blocks} 
                updateBlock={updateBlock} 
                deleteBlock={(id) => setBlocks(blocks.filter(b => b.id !== id))} 
                isPreview={isPreview} 
              />
            </DndContext>
          </div>
        </main>
      </div>
    </div>
  );
}