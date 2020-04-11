import React from 'react'
import PropTypes from 'prop-types'
import '../sass/components/loading.scss'
import ReactLoading from 'react-loading'

const Loading = ({ type, color }) => (
  <div className="loading">
    <ReactLoading type={type} color={color} height={32} width={32} />
  </div>
)

Loading.defaultProps = {
  type: 'spin',
  color: getComputedStyle(document.documentElement).getPropertyValue(
    '--main-color'
  ),
}

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
}

export default Loading
