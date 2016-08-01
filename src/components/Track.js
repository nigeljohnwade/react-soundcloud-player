import React, {Component} from 'react';
import { PlayButton, Progress, Timer } from 'react-soundplayer/components';

export default class Track extends Component {
    render() {
        const { track, soundCloudAudio, playing, seeking, currentTime, duration } = this.props;
        const currentProgress = currentTime / duration * 100 || 0;
        return (
            <div className="player">
                <div className="background">
                    <Progress
                        className="progress-container"
                        innerClassName="progress"
                        soundCloudAudio={soundCloudAudio}
                        value={currentProgress} />
    
                    <img className='waveform' src={track && track.waveform_url} />
                </div>
                <PlayButton
                    className="orange-button"
                    soundCloudAudio={soundCloudAudio}
                    playing={playing}
                    seeking={seeking} />
                <Timer
                    duration={duration}
                    className="timer"
                    soundCloudAudio={soundCloudAudio}
                    currentTime={currentTime} />
                <div className="track-info">
                    <h2 className="track-title">{track && track.title} 
                    {track && track.bpm ? (
                                <span> ({track.bpm}bpm)</span>
                            
                    ) :
                        null}
                    </h2>
                    <h3 className="track-user">{track && track.user && track.user.username}</h3>
                    <img className='artwork' src={track && track.artwork_url} />
                    <p>Genre: <span>{track && track.genre}</span></p>
                    <p>Tags: <span>{track && track.tag_list}</span></p>
                </div>

            </div>
        );
    }
}