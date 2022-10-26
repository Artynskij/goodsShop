import styles from "./modal.module.css"


export const Modal = (props) => {
    
   

    
return (
    <div  className={props.active ? styles.modal + ' ' + styles.active : styles.modal} onClick={() => {props.setActive(false)}}>
        <div className={props.active ? styles.modal__ctn_content + ' ' + styles.active : styles.modal__ctn_content}>
          <div className={styles.content}>
           {props.children}
          </div>
        </div>
      </div>
)
}