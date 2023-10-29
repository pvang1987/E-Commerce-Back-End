const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: [{ model: Product }],
    });

    if (categoriesData.length === 0) {
      res.status(404).json({ message: 'No categories were found' });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryById) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(categoryById);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body;
    const newCategory = await Category.create({ category_name });
    res.status(201).json(newCategory);
    console.log('A new category was added!');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { category_name } = req.body;
    const updateCategory = await Category.update(
      { category_name },
      {
        where: {
          id,
        },
      }
    );

    if (updateCategory[0] === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    const categoryById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    res.status(200).json(categoryById);
    console.log('This category has been updated!');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCategory = await Category.destroy({
      where: {
        id,
      },
    });

    if (deleteCategory === 0) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json(deleteCategory);
    console.log('Category has been deleted!');

} catch (err) {
  res.status(500).json(err);
};
});

module.exports = router;
