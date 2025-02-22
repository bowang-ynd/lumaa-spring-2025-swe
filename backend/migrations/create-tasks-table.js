exports.up = (pgm) => {
    pgm.createTable('tasks', {
      id: 'id',
      title: { type: 'varchar(255)', notNull: true },
      description: { type: 'text', notNull: false },
      isComplete: { type: 'boolean', notNull: true, default: false },
      userId: {
        type: 'integer',
        notNull: true,
        references: '"users"', 
        onDelete: 'cascade'
      }
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('tasks');
  };
  