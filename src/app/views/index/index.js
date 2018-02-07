import styles               from './styles.scss'
import { inject, observer } from 'mobx-react'
import PropTypes            from 'prop-types'
import React                from 'react'

import { Mixer, Sound }     from 'app/mixer'

import Channel              from 'components/Channel'

@inject('mixer')
@observer
export default class Index extends React.Component {
  static propTypes = {
    mixer: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    const { mixer } = this.props
    const sound = new Sound()
    sound.output.connect(mixer.channels[0].input)
    await sound.load(
      require('../../../../../../../Desktop/documents/Music/Download/Maria Takeuchi 竹内 まりや Plastic Love-3bNITQR4Uso.mp3'),
    )
    sound.play()
  }

  render() {
    const { mixer } = this.props
    return (
      <div className={styles.index}>
        {mixer.channels.map((channel, i) => {
          return (
            <Channel
              key={i}
              style={{ width: 100, height: 320 }}
              channel={channel}
            />
          )
        })}

        <Channel
          key={2}
          style={{ width: 100, height: 320 }}
          channel={mixer.master}
        />
      </div>
    )
  }
}
