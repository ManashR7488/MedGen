import { useNavigate } from 'react-router-dom';
import { MdChevronRight } from 'react-icons/md';

export const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="breadcrumbs text-sm my-4">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {index === items.length - 1 ? (
              <span className="font-semibold text-gray-800">{item.label}</span>
            ) : (
              <button
                onClick={() => navigate(item.path)}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
