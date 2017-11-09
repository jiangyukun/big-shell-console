/**
 * Created by jiangyukun on 2017/11/9.
 */
import React from 'react'
import Transition from 'app-core/modal/Transition'

export default (props) => {
  return (
    <Transition show={props.show}>
      <div className="my-modal-content remark-dialog-content">
        {props.children}
      </div>
    </Transition>
  )
}
