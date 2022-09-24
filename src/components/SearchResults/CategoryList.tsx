import styles from './CategoryList.module.css';

const CategoryList = ({ categories }: any) => {
  return (
    <div>
      {Object.keys(categories).map((categoryKey: any) => (
        <span key={categoryKey} className={styles.category}>
          {categories[categoryKey]}
        </span>
      ))}
    </div>
  );
};

export default CategoryList;
