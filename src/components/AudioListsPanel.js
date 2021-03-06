import cls from 'classnames'
import React, { memo } from 'react'
import ReactDragListView from 'react-drag-listview/lib/ReactDragListView'

const AudioListsPanel = ({
  audioLists,
  onCancel,
  onDelete,
  onPlay,
  playId,
  loading,
  panelToggleAnimate,
  glassBg,
  remove,
  removeId,
  audioListsDragEnd,
  isMobile,
  locale,
  icon,
  playing,
}) => (
  <div
    className={cls('audio-lists-panel', panelToggleAnimate, {
      'glass-bg': glassBg,
    })}
  >
    <div className="audio-lists-panel-header">
      <h2 className="audio-lists-panel-header-title">
        <span>{locale.playListsText} / </span>
        <span className="audio-lists-panel-header-num">
          {audioLists.length}
        </span>
        <span className="audio-lists-panel-header-actions">
          {remove && (
            <>
              <span
                className="audio-lists-panel-header-delete-btn"
                title={locale.removeAudioListsText}
                onClick={onDelete()}
              >
                {icon.delete}
              </span>
              <span className="audio-lists-panel-header-line" />
            </>
          )}
          <span
            className="audio-lists-panel-header-close-btn"
            title={locale.closeText}
            onClick={onCancel}
          >
            {isMobile ? icon.packUpPanelMobile : icon.close}
          </span>
        </span>
      </h2>
    </div>
    <div
      className={cls('audio-lists-panel-content', {
        'no-content': audioLists.length < 1,
      })}
    >
      {audioLists.length >= 1 ? (
        <ReactDragListView
          nodeSelector="li"
          handleSelector=".player-name"
          lineClassName="audio-lists-panel-drag-line"
          onDragEnd={audioListsDragEnd}
        >
          <ul>
            {audioLists.map((audio) => {
              const { name, singer } = audio
              const isCurrentPlaying = playId === audio.id
              return (
                <li
                  key={audio.id}
                  title={
                    !playing
                      ? locale.clickToPlayText
                      : isCurrentPlaying
                      ? locale.clickToPauseText
                      : locale.clickToPlayText
                  }
                  className={cls(
                    'audio-item',
                    { playing: isCurrentPlaying },
                    { pause: !playing },
                    { remove: removeId === audio.id },
                  )}
                  onClick={() => onPlay(audio.id)}
                >
                  <span className="group player-status">
                    <span className="player-icons">
                      {isCurrentPlaying && loading
                        ? icon.loading
                        : isCurrentPlaying
                        ? playing
                          ? icon.pause
                          : icon.play
                        : undefined}
                    </span>
                  </span>
                  <span className="group player-name" title={name}>
                    {name}
                  </span>
                  <span className="group player-singer" title={singer}>
                    {singer}
                  </span>
                  {remove && (
                    <span
                      className="group player-delete"
                      title={locale.clickToDeleteText(name)}
                      onClick={onDelete(audio.id)}
                    >
                      {icon.close}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </ReactDragListView>
      ) : (
        <>
          <span>{icon.empty}</span>
          <span className="no-data">
            {locale.emptyText || locale.notContentText}
          </span>
        </>
      )}
    </div>
  </div>
)

export default memo(AudioListsPanel)
