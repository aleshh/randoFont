import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ChevronDown, Shuffle } from 'lucide-react';

import CheckboxInput from './CheckboxInput';

import {
  setCategoriesWanted,
  setFontCount,
  fetchFonts,
  setRandomFonts,
  setRandomFontCycle,
  setCurrentlyViewedFonts,
  setSubsetWanted
} from '../actions/fontActions';
import { getEligibleFonts } from '../utils/fontFilters';
import { getNextRandomFonts } from '../utils/randomFontCycle';

class Controls extends Component {
  categoryMenuRef = React.createRef();

  state = {
    categoriesOpen: false,
    draftCategoriesWanted: []
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  componentDidMount() {
    if (this.props.allFonts.length === 0) {
      // on initial app loal
      this.props.fetchFonts();
    } else {
      //if we're returning from Favorites, refresh random fonts
      this.randomizeFonts();
    }
  }

  componentDidUpdate(prevProps) {
    const fontsLoaded = prevProps.allFonts !== this.props.allFonts
      && this.props.allFonts.length > 0;
    const selectionChanged = prevProps.categoriesWanted !== this.props.categoriesWanted
      || prevProps.fontCount !== this.props.fontCount
      || prevProps.subsetWanted !== this.props.subsetWanted;
    const fontsCleared = prevProps.randomFonts.length > 0
      && this.props.randomFonts.length === 0;

    if (fontsLoaded || selectionChanged || fontsCleared) {
      this.randomizeFonts();
    }
  }

  closeCategories = () => {
    this.setState({
      categoriesOpen: false,
      draftCategoriesWanted: this.props.categoriesWanted
    });
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick = event => {
    if (
      this.categoryMenuRef.current
      && this.categoryMenuRef.current.contains(event.target)
    ) {
      return;
    }

    this.closeCategories();
  }

  toggleCategories = event => {
    this.setState(
      state => ({
        categoriesOpen: !state.categoriesOpen,
        draftCategoriesWanted: state.categoriesOpen
          ? this.props.categoriesWanted
          : this.props.categoriesWanted
      }),
      () => {
        if (this.state.categoriesOpen) {
          document.addEventListener('click', this.handleDocumentClick);
        } else {
          document.removeEventListener('click', this.handleDocumentClick);
        }
      }
    );
  }

  toggleDraftCategory = event => {
    const { checked, name } = event.target;

    this.setState(state => ({
      draftCategoriesWanted: checked
        ? [...state.draftCategoriesWanted, name]
        : state.draftCategoriesWanted.filter(category => category !== name)
    }));
  }

  applyCategories = () => {
    this.props.setCategoriesWanted(this.state.draftCategoriesWanted);
    this.closeCategories();
  }

  randomizeFonts = () => {
    const {
      categoriesWanted,
      fontCount,
      allFonts,
      subsetWanted,
      randomFontPoolKey,
      remainingRandomFontFamilies
    } = this.props;
    const eligibleFonts = getEligibleFonts({
      allFonts,
      categoriesWanted,
      favoriteFonts: this.props.favoriteFonts,
      subsetWanted
    });

    if (eligibleFonts.length === 0) return;

    const {
      poolKey,
      remainingFontFamilies,
      randomFonts
    } = getNextRandomFonts({
      eligibleFonts,
      fontCount,
      poolKey: randomFontPoolKey,
      remainingFontFamilies: remainingRandomFontFamilies
    });

    this.props.setRandomFonts(randomFonts);
    this.props.setRandomFontCycle({ poolKey, remainingFontFamilies });
    this.props.setCurrentlyViewedFonts(randomFonts);
  }

  render() {
    const {
      fontCount,
      subsetWanted,
      categoriesWanted,
      setFontCount,
      setSubsetWanted
    } = this.props;
    const categories = [
      'serif', 'sans-serif', 'display', 'handwriting', 'monospace'
    ];
    const quantityOptions = [
      { label: 'All', value: 'all' },
      { label: '1', value: 1 },
      { label: '3', value: 3 },
      { label: '6', value: 6 },
      { label: '12', value: 12 },
      { label: '24', value: 24 },
      { label: '48', value: 48 }
    ];
    const subsetOptions = [
      { label: 'Any', value: 'any' },
      { label: 'Latin', value: 'latin' },
      { label: 'Latin Ext', value: 'latin-ext' },
      { label: 'Cyrillic', value: 'cyrillic' },
      { label: 'Cyrillic Ext', value: 'cyrillic-ext' },
      { label: 'Greek', value: 'greek' },
      { label: 'Greek Ext', value: 'greek-ext' },
      { label: 'Arabic', value: 'arabic' },
      { label: 'Hebrew', value: 'hebrew' },
      { label: 'Devanagari', value: 'devanagari' },
      { label: 'Thai', value: 'thai' },
      { label: 'Vietnamese', value: 'vietnamese' },
      { label: 'Korean', value: 'korean' },
      { label: 'Japanese', value: 'japanese' }
    ];
    const activeCategories = this.state.categoriesOpen
      ? this.state.draftCategoriesWanted
      : categoriesWanted;
    const selectedCategoryCount = activeCategories.length;
    const categoryLabel = selectedCategoryCount === categories.length
      ? 'All styles'
      : `${selectedCategoryCount} styles`;

    return (
      <div className="controls-toolbar">
        <label className="control-select-group">
          <select
            className="control-select"
            value={fontCount}
            onChange={setFontCount}
            name="quantity"
            id="font-quantity"
          >
            { quantityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <span>Qty.</span>
        </label>

        <label className="control-select-group control-select-group-wide">
          <select
            className="control-select"
            value={subsetWanted}
            onChange={setSubsetWanted}
            name="subset"
            id="font-subset"
          >
            { subsetOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <span>Alphabet</span>
        </label>

        <div className="category-menu" ref={this.categoryMenuRef}>
          <button
            type="button"
            className="category-menu-button"
            onClick={this.toggleCategories}
            aria-haspopup="true"
            aria-expanded={this.state.categoriesOpen}
          >
            {categoryLabel}
            <ChevronDown size={15} aria-hidden="true" />
          </button>
          {this.state.categoriesOpen && (
            <div className="category-menu-panel">
              {categories.map(
                category => (
                  <CheckboxInput
                    key={category}
                    name={category}
                    checked={this.state.draftCategoriesWanted.includes(category)}
                    toggleCategoryWanted={this.toggleDraftCategory}
                    className="category-menu-option"
                  />
                )
              )}
              <div className="category-menu-actions">
                <button
                  type="button"
                  className="category-apply-button"
                  onClick={this.applyCategories}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={this.randomizeFonts}
          className="reload-button"
          title="Shuffle"
          aria-label="Shuffle fonts"
        >
          <Shuffle size={16} aria-hidden="true" />
          <span className="reload-label">Shuffle</span>
        </button>
      </div>
    )
  }
}

Controls.propTypes = {
  allFonts: PropTypes.array.isRequired,
  randomFonts: PropTypes.array.isRequired,
  fontCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  subsetWanted: PropTypes.string.isRequired,
  categoriesWanted: PropTypes.array.isRequired,
  fetchFonts: PropTypes.func.isRequired,
  setCategoriesWanted: PropTypes.func.isRequired,
  setFontCount: PropTypes.func.isRequired,
  setRandomFonts: PropTypes.func.isRequired,
  setCurrentlyViewedFonts: PropTypes.func.isRequired,
  setSubsetWanted: PropTypes.func.isRequired,
  randomFontPoolKey: PropTypes.string.isRequired,
  remainingRandomFontFamilies: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  allFonts: state.fonts.allFonts,
  randomFonts: state.fonts.randomFonts,
  favoriteFonts: state.fonts.favoriteFonts,
  categoriesWanted: state.fonts.categoriesWanted,
  fontCount: state.fonts.fontCount,
  subsetWanted: state.fonts.subsetWanted,
  randomFontPoolKey: state.fonts.randomFontPoolKey,
  remainingRandomFontFamilies: state.fonts.remainingRandomFontFamilies
})

export default connect(
  mapStateToProps,
  {
    setFontCount,
    setCategoriesWanted,
    fetchFonts,
    setRandomFonts,
    setRandomFontCycle,
    setCurrentlyViewedFonts,
    setSubsetWanted
  }
)(Controls);
