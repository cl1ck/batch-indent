const expect = require('chai').expect;
const Tools = require('./tools');

const content_2_space = `import React, { PropTypes } from 'react';
const componentName = props => {
  /**
   * <- Has extra space after indentations.
   */
  // Should not change 2-spaces here -> [  ]
  return (
    <div test="  <- Should not change">
      { null }
    </div>
  );
};`;

const content_tabs = `import React, { PropTypes } from 'react';
const componentName = props => {
	/**
	 * <- Has extra space after indentations.
	 */
	// Should not change 2-spaces here -> [  ]
	return (
		<div test="  <- Should not change">
			{ null }
		</div>
	);
};`;

describe('Tools', () => {
  describe('#replaceIndentations()', () => {
    it('should replace indentations', () => {

      const converted_to_tabs = Tools.replaceIndentations(content_2_space, '  ', '\t');
      const converted_to_2_spaces = Tools.replaceIndentations(content_tabs, '\t', '  ');

	  expect(converted_to_tabs).equal(content_tabs);
	  expect(converted_to_2_spaces).equal(content_2_space);
    });
  });
});