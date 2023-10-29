const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }]
    });
    if (!tagData) {
      res.status(200).json({message: 'No tags were found.'});
      return;
    }

    res.json(tagData);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagById) {
      res.status(200).json({message: 'Tag not were found.'});
      return;
    };

    res.status(200).json(tagById);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tagName
    });

    res.status(200).json(newTag);
    console.log('Tag was created!');

  } catch (err) {
    res.status(500).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTag = await Tag.update({
      tag_name: req.body.tagName
    },
    {
      where: {
        id: req.params.id
      }
    });
    
    // sends message if user requests to update tag that does not exist
    const tagById = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!tagById) {
      res.status(200).json({message: 'Tag was not found.'});
      return;
    };

    res.status(200).json(updateTag);
    console.log('Tag has been updated!');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(200).json({message: 'Tag was not found.'});
      return;
    }

    res.status(200).json(deleteTag);
    console.log('Tag was deleted!');
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
