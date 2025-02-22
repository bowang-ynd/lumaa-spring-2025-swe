exports.up = (pgm) => {
    pgm.createTable('users', {
      id: 'id',
      username: { type: 'varchar(255)', notNull: true, unique: true },
      password: { type: 'varchar(255)', notNull: true }
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('users');
  };
  