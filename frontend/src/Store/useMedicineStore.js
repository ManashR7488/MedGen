import { create } from 'zustand';

const MOCK_MEDICINES = [
  {
    id: 1,
    name: 'Aspirin 500mg',
    category: 'Pain Relief',
    price: 4.99,
    originalPrice: 6.99,
    discount: 28,
    description: 'Effective pain reliever and fever reducer',
    image: 'https://via.placeholder.com/250x250?text=Aspirin',
    stock: 45,
    dosage: '500mg',
    manufacturer: 'HealthCare Inc',
    rating: 4.5,
    reviews: 120,
    prescription_required: false,
    tags: ['pain-relief', 'fever', 'popular']
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    price: 8.99,
    originalPrice: 12.99,
    discount: 30,
    description: 'Broad-spectrum antibiotic for bacterial infections',
    image: 'https://via.placeholder.com/250x250?text=Amoxicillin',
    stock: 32,
    dosage: '250mg',
    manufacturer: 'MediCure',
    rating: 4.7,
    reviews: 89,
    prescription_required: true,
    tags: ['antibiotic', 'infection']
  },
  {
    id: 3,
    name: 'Vitamin D3 1000IU',
    category: 'Vitamins & Supplements',
    price: 5.99,
    originalPrice: 7.99,
    discount: 25,
    description: 'Supports bone health and immune function',
    image: 'https://via.placeholder.com/250x250?text=Vitamin+D3',
    stock: 78,
    dosage: '1000IU',
    manufacturer: 'NutriLife',
    rating: 4.6,
    reviews: 234,
    prescription_required: false,
    tags: ['vitamin', 'supplement', 'popular']
  },
  {
    id: 4,
    name: 'Ibuprofen 200mg',
    category: 'Pain Relief',
    price: 3.49,
    originalPrice: 4.99,
    discount: 30,
    description: 'Anti-inflammatory pain reliever',
    image: 'https://via.placeholder.com/250x250?text=Ibuprofen',
    stock: 95,
    dosage: '200mg',
    manufacturer: 'HealthCare Inc',
    rating: 4.4,
    reviews: 156,
    prescription_required: false,
    tags: ['pain-relief', 'inflammation', 'popular']
  },
  {
    id: 5,
    name: 'Cetirizine 10mg',
    category: 'Cold & Flu',
    price: 6.99,
    originalPrice: 9.99,
    discount: 30,
    description: 'Allergy and cold symptom relief',
    image: 'https://via.placeholder.com/250x250?text=Cetirizine',
    stock: 56,
    dosage: '10mg',
    manufacturer: 'ColdCure',
    rating: 4.5,
    reviews: 178,
    prescription_required: false,
    tags: ['cold', 'allergy', 'antihistamine']
  },
  {
    id: 6,
    name: 'Omeprazole 20mg',
    category: 'Digestive Health',
    price: 7.49,
    originalPrice: 10.99,
    discount: 31,
    description: 'Acid reflux and heartburn relief',
    image: 'https://via.placeholder.com/250x250?text=Omeprazole',
    stock: 42,
    dosage: '20mg',
    manufacturer: 'DigestCare',
    rating: 4.6,
    reviews: 98,
    prescription_required: true,
    tags: ['digestive', 'heartburn', 'acid-reflux']
  },
  {
    id: 7,
    name: 'First Aid Antiseptic Spray',
    category: 'First Aid',
    price: 5.99,
    originalPrice: 7.49,
    discount: 20,
    description: 'Disinfectant spray for cuts and wounds',
    image: 'https://via.placeholder.com/250x250?text=Antiseptic',
    stock: 67,
    dosage: '100ml',
    manufacturer: 'HealthGuard',
    rating: 4.3,
    reviews: 145,
    prescription_required: false,
    tags: ['first-aid', 'antiseptic', 'wound-care']
  },
  {
    id: 8,
    name: 'Metformin 500mg',
    category: 'Diabetes Care',
    price: 9.99,
    originalPrice: 14.99,
    discount: 33,
    description: 'Diabetes management medication',
    image: 'https://via.placeholder.com/250x250?text=Metformin',
    stock: 38,
    dosage: '500mg',
    manufacturer: 'DiabeteCare',
    rating: 4.7,
    reviews: 203,
    prescription_required: true,
    tags: ['diabetes', 'blood-sugar']
  },
  {
    id: 9,
    name: 'Lisinopril 10mg',
    category: 'Heart Health',
    price: 10.99,
    originalPrice: 16.99,
    discount: 35,
    description: 'Blood pressure management',
    image: 'https://via.placeholder.com/250x250?text=Lisinopril',
    stock: 28,
    dosage: '10mg',
    manufacturer: 'CardioHealth',
    rating: 4.6,
    reviews: 167,
    prescription_required: true,
    tags: ['heart', 'blood-pressure']
  },
  {
    id: 10,
    name: 'Salicylic Acid 2%',
    category: 'Skin Care',
    price: 6.49,
    originalPrice: 8.99,
    discount: 27,
    description: 'Acne treatment solution',
    image: 'https://via.placeholder.com/250x250?text=Salicylic',
    stock: 52,
    dosage: '2%',
    manufacturer: 'SkinCare Co',
    rating: 4.4,
    reviews: 134,
    prescription_required: false,
    tags: ['skin-care', 'acne', 'dermatology']
  },
  {
    id: 11,
    name: 'Baby Diaper Rash Cream',
    category: 'Baby Care',
    price: 7.99,
    originalPrice: 10.99,
    discount: 27,
    description: 'Gentle formula for baby skin',
    image: 'https://via.placeholder.com/250x250?text=Diaper+Rash',
    stock: 84,
    dosage: '100g',
    manufacturer: 'BabyCare Plus',
    rating: 4.5,
    reviews: 189,
    prescription_required: false,
    tags: ['baby', 'skin-care', 'gentle']
  },
  {
    id: 12,
    name: 'Paracetamol 650mg',
    category: 'Pain Relief',
    price: 4.49,
    originalPrice: 6.49,
    discount: 30,
    description: 'Fast-acting pain and fever relief',
    image: 'https://via.placeholder.com/250x250?text=Paracetamol',
    stock: 101,
    dosage: '650mg',
    manufacturer: 'HealthCare Inc',
    rating: 4.6,
    reviews: 245,
    prescription_required: false,
    tags: ['pain-relief', 'fever', 'popular', 'bestseller']
  },
  {
    id: 13,
    name: 'Azithromycin 500mg',
    category: 'Antibiotics',
    price: 11.99,
    originalPrice: 17.99,
    discount: 33,
    description: 'Broad-spectrum antibiotic',
    image: 'https://via.placeholder.com/250x250?text=Azithromycin',
    stock: 19,
    dosage: '500mg',
    manufacturer: 'MediCure',
    rating: 4.5,
    reviews: 76,
    prescription_required: true,
    tags: ['antibiotic', 'infection', 'respiratory']
  },
  {
    id: 14,
    name: 'Multivitamin Capsule',
    category: 'Vitamins & Supplements',
    price: 8.99,
    originalPrice: 12.99,
    discount: 30,
    description: 'Complete daily nutrition support',
    image: 'https://via.placeholder.com/250x250?text=Multivitamin',
    stock: 73,
    dosage: '1 capsule',
    manufacturer: 'NutriLife',
    rating: 4.5,
    reviews: 289,
    prescription_required: false,
    tags: ['vitamin', 'supplement', 'popular', 'bestseller']
  },
  {
    id: 15,
    name: 'Cough Syrup 100ml',
    category: 'Cold & Flu',
    price: 5.49,
    originalPrice: 7.99,
    discount: 31,
    description: 'Effective cough suppressant',
    image: 'https://via.placeholder.com/250x250?text=Cough+Syrup',
    stock: 47,
    dosage: '100ml',
    manufacturer: 'ColdCure',
    rating: 4.3,
    reviews: 112,
    prescription_required: false,
    tags: ['cold', 'cough', 'syrup']
  },
  {
    id: 16,
    name: 'Antacid Tablet',
    category: 'Digestive Health',
    price: 4.99,
    originalPrice: 6.99,
    discount: 28,
    description: 'Fast heartburn relief',
    image: 'https://via.placeholder.com/250x250?text=Antacid',
    stock: 66,
    dosage: '1 tablet',
    manufacturer: 'DigestCare',
    rating: 4.4,
    reviews: 154,
    prescription_required: false,
    tags: ['digestive', 'heartburn', 'antacid']
  },
  {
    id: 17,
    name: 'Gauze Pads Pack',
    category: 'First Aid',
    price: 4.99,
    originalPrice: 6.49,
    discount: 23,
    description: 'Sterile gauze for wound dressing',
    image: 'https://via.placeholder.com/250x250?text=Gauze+Pads',
    stock: 112,
    dosage: 'Pack of 50',
    manufacturer: 'HealthGuard',
    rating: 4.6,
    reviews: 187,
    prescription_required: false,
    tags: ['first-aid', 'wound-care', 'medical-supplies']
  },
  {
    id: 18,
    name: 'Insulin Syringe Pack',
    category: 'Diabetes Care',
    price: 12.99,
    originalPrice: 18.99,
    discount: 31,
    description: 'Precision insulin delivery',
    image: 'https://via.placeholder.com/250x250?text=Insulin+Syringe',
    stock: 25,
    dosage: 'Pack of 10',
    manufacturer: 'DiabeteCare',
    rating: 4.7,
    reviews: 98,
    prescription_required: true,
    tags: ['diabetes', 'injection', 'medical-supplies']
  },
  {
    id: 19,
    name: 'Atorvastatin 20mg',
    category: 'Heart Health',
    price: 9.49,
    originalPrice: 13.99,
    discount: 32,
    description: 'Cholesterol management',
    image: 'https://via.placeholder.com/250x250?text=Atorvastatin',
    stock: 41,
    dosage: '20mg',
    manufacturer: 'CardioHealth',
    rating: 4.6,
    reviews: 176,
    prescription_required: true,
    tags: ['heart', 'cholesterol']
  },
  {
    id: 20,
    name: 'Benzoyl Peroxide 5%',
    category: 'Skin Care',
    price: 7.99,
    originalPrice: 11.99,
    discount: 33,
    description: 'Powerful acne fighter',
    image: 'https://via.placeholder.com/250x250?text=Benzoyl',
    stock: 38,
    dosage: '5%',
    manufacturer: 'SkinCare Co',
    rating: 4.5,
    reviews: 167,
    prescription_required: false,
    tags: ['skin-care', 'acne', 'dermatology', 'popular']
  },
  {
    id: 21,
    name: 'Baby Fever Syrup',
    category: 'Baby Care',
    price: 6.49,
    originalPrice: 8.99,
    discount: 27,
    description: 'Gentle fever relief for babies',
    image: 'https://via.placeholder.com/250x250?text=Baby+Fever',
    stock: 55,
    dosage: '100ml',
    manufacturer: 'BabyCare Plus',
    rating: 4.6,
    reviews: 201,
    prescription_required: false,
    tags: ['baby', 'fever', 'children']
  },
  {
    id: 22,
    name: 'Diclofenac 50mg',
    category: 'Pain Relief',
    price: 5.99,
    originalPrice: 8.99,
    discount: 33,
    description: 'Anti-inflammatory pain relief',
    image: 'https://via.placeholder.com/250x250?text=Diclofenac',
    stock: 44,
    dosage: '50mg',
    manufacturer: 'HealthCare Inc',
    rating: 4.5,
    reviews: 198,
    prescription_required: true,
    tags: ['pain-relief', 'inflammation', 'nonsteroidal']
  },
  {
    id: 23,
    name: 'Ciprofloxacin 500mg',
    category: 'Antibiotics',
    price: 10.99,
    originalPrice: 15.99,
    discount: 31,
    description: 'Powerful fluoroquinolone antibiotic',
    image: 'https://via.placeholder.com/250x250?text=Ciprofloxacin',
    stock: 22,
    dosage: '500mg',
    manufacturer: 'MediCure',
    rating: 4.6,
    reviews: 134,
    prescription_required: true,
    tags: ['antibiotic', 'infection', 'fluoroquinolone']
  },
  {
    id: 24,
    name: 'Calcium + Vitamin D',
    category: 'Vitamins & Supplements',
    price: 7.49,
    originalPrice: 10.99,
    discount: 31,
    description: 'Bone health support formula',
    image: 'https://via.placeholder.com/250x250?text=Calcium',
    stock: 69,
    dosage: '1 tablet',
    manufacturer: 'NutriLife',
    rating: 4.5,
    reviews: 212,
    prescription_required: false,
    tags: ['vitamin', 'supplement', 'bone-health', 'popular']
  },
  {
    id: 25,
    name: 'Flu Vaccine (inactivated)',
    category: 'Cold & Flu',
    price: 19.99,
    originalPrice: 29.99,
    discount: 33,
    description: 'Annual flu prevention vaccine',
    image: 'https://via.placeholder.com/250x250?text=Flu+Vaccine',
    stock: 18,
    dosage: '0.5ml injection',
    manufacturer: 'VirusShield',
    rating: 4.7,
    reviews: 267,
    prescription_required: true,
    tags: ['vaccine', 'flu', 'prevention']
  },
  {
    id: 26,
    name: 'Probiotic Capsule',
    category: 'Digestive Health',
    price: 8.99,
    originalPrice: 12.99,
    discount: 30,
    description: 'Gut health and digestion support',
    image: 'https://via.placeholder.com/250x250?text=Probiotic',
    stock: 71,
    dosage: '1 capsule',
    manufacturer: 'DigestCare',
    rating: 4.6,
    reviews: 234,
    prescription_required: false,
    tags: ['digestive', 'probiotic', 'supplement', 'popular']
  },
  {
    id: 27,
    name: 'Elastic Bandage Roll',
    category: 'First Aid',
    price: 3.99,
    originalPrice: 5.49,
    discount: 27,
    description: 'Compression support for sprains',
    image: 'https://via.placeholder.com/250x250?text=Bandage',
    stock: 98,
    dosage: '5cm x 5m',
    manufacturer: 'HealthGuard',
    rating: 4.4,
    reviews: 178,
    prescription_required: false,
    tags: ['first-aid', 'bandage', 'compression']
  },
  {
    id: 28,
    name: 'Blood Glucose Test Strips',
    category: 'Diabetes Care',
    price: 14.99,
    originalPrice: 22.99,
    discount: 34,
    description: 'Accurate glucose monitoring',
    image: 'https://via.placeholder.com/250x250?text=Test+Strips',
    stock: 50,
    dosage: 'Box of 50',
    manufacturer: 'DiabeteCare',
    rating: 4.7,
    reviews: 156,
    prescription_required: false,
    tags: ['diabetes', 'testing', 'monitoring']
  },
  {
    id: 29,
    name: 'Aspirin 75mg (Low Dose)',
    category: 'Heart Health',
    price: 5.99,
    originalPrice: 8.99,
    discount: 33,
    description: 'Cardiovascular protection',
    image: 'https://via.placeholder.com/250x250?text=Aspirin+75',
    stock: 87,
    dosage: '75mg',
    manufacturer: 'CardioHealth',
    rating: 4.6,
    reviews: 213,
    prescription_required: true,
    tags: ['heart', 'cardiovascular', 'aspirin']
  },
  {
    id: 30,
    name: 'Tretinoin 0.025%',
    category: 'Skin Care',
    price: 13.99,
    originalPrice: 20.99,
    discount: 33,
    description: 'Anti-aging and skin renewal cream',
    image: 'https://via.placeholder.com/250x250?text=Tretinoin',
    stock: 15,
    dosage: '0.025%',
    manufacturer: 'SkinCare Co',
    rating: 4.5,
    reviews: 89,
    prescription_required: true,
    tags: ['skin-care', 'anti-aging', 'retinoid', 'dermatology']
  },
  {
    id: 31,
    name: 'Baby Teething Gel',
    category: 'Baby Care',
    price: 6.99,
    originalPrice: 9.99,
    discount: 30,
    description: 'Soothing relief for teething pain',
    image: 'https://via.placeholder.com/250x250?text=Teething+Gel',
    stock: 62,
    dosage: '20g',
    manufacturer: 'BabyCare Plus',
    rating: 4.5,
    reviews: 178,
    prescription_required: false,
    tags: ['baby', 'teething', 'pain-relief']
  },
  {
    id: 32,
    name: 'Naproxen 250mg',
    category: 'Pain Relief',
    price: 6.49,
    originalPrice: 9.49,
    discount: 31,
    description: 'Long-lasting pain and inflammation relief',
    image: 'https://via.placeholder.com/250x250?text=Naproxen',
    stock: 53,
    dosage: '250mg',
    manufacturer: 'HealthCare Inc',
    rating: 4.5,
    reviews: 167,
    prescription_required: false,
    tags: ['pain-relief', 'inflammation', 'nonsteroidal', 'popular']
  },
  {
    id: 33,
    name: 'Doxycycline 100mg',
    category: 'Antibiotics',
    price: 9.99,
    originalPrice: 14.99,
    discount: 33,
    description: 'Broad-spectrum tetracycline antibiotic',
    image: 'https://via.placeholder.com/250x250?text=Doxycycline',
    stock: 35,
    dosage: '100mg',
    manufacturer: 'MediCure',
    rating: 4.6,
    reviews: 145,
    prescription_required: true,
    tags: ['antibiotic', 'infection', 'tetracycline']
  },
  {
    id: 34,
    name: 'Iron Supplement 325mg',
    category: 'Vitamins & Supplements',
    price: 6.99,
    originalPrice: 10.99,
    discount: 36,
    description: 'Anemia prevention and treatment',
    image: 'https://via.placeholder.com/250x250?text=Iron',
    stock: 58,
    dosage: '325mg',
    manufacturer: 'NutriLife',
    rating: 4.4,
    reviews: 198,
    prescription_required: false,
    tags: ['vitamin', 'supplement', 'iron']
  },
  {
    id: 35,
    name: 'Loratadine 10mg',
    category: 'Cold & Flu',
    price: 5.99,
    originalPrice: 8.99,
    discount: 33,
    description: 'Non-drowsy allergy relief',
    image: 'https://via.placeholder.com/250x250?text=Loratadine',
    stock: 74,
    dosage: '10mg',
    manufacturer: 'ColdCure',
    rating: 4.5,
    reviews: 189,
    prescription_required: false,
    tags: ['cold', 'allergy', 'antihistamine', 'popular']
  },
  {
    id: 36,
    name: 'Loperamide 2mg',
    category: 'Digestive Health',
    price: 4.99,
    originalPrice: 6.99,
    discount: 28,
    description: 'Anti-diarrhea medication',
    image: 'https://via.placeholder.com/250x250?text=Loperamide',
    stock: 45,
    dosage: '2mg',
    manufacturer: 'DigestCare',
    rating: 4.5,
    reviews: 134,
    prescription_required: false,
    tags: ['digestive', 'diarrhea', 'antidiarrheal']
  }
];

const CATEGORIES = [
  'Pain Relief',
  'Antibiotics',
  'Vitamins & Supplements',
  'Cold & Flu',
  'Digestive Health',
  'First Aid',
  'Diabetes Care',
  'Heart Health',
  'Skin Care',
  'Baby Care'
];

export const useMedicineStore = create((set, get) => ({
  medicines: MOCK_MEDICINES,
  categories: CATEGORIES,
  searchQuery: '',
  selectedCategory: null,
  priceRange: { min: 0, max: 100 },
  sortBy: 'name',
  filteredMedicines: MOCK_MEDICINES,

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().getFilteredMedicines();
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().getFilteredMedicines();
  },

  setPriceRange: (min, max) => {
    set({ priceRange: { min, max } });
    get().getFilteredMedicines();
  },

  setSortBy: (sortOption) => {
    set({ sortBy: sortOption });
    get().getFilteredMedicines();
  },

  getFilteredMedicines: () => {
    const state = get();
    let filtered = [...state.medicines];

    // Filter by search query
    if (state.searchQuery) {
      filtered = filtered.filter(
        (med) =>
          med.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          med.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          med.tags.some((tag) => tag.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (state.selectedCategory) {
      filtered = filtered.filter((med) => med.category === state.selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (med) => med.price >= state.priceRange.min && med.price <= state.priceRange.max
    );

    // Sort
    switch (state.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    set({ filteredMedicines: filtered });
  },

  getMedicineById: (id) => {
    return get().medicines.find((med) => med.id === parseInt(id));
  }
}));
