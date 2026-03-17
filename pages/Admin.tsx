import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Trash2, Plus, Lock, LayoutDashboard, BedDouble, FileText, Image, Settings, Key, Save, CheckCircle, Images, Edit2, X, Mail, UserPlus, Shield, Upload, Check } from 'lucide-react';
import { Suite } from '../types';

// Gallery image type
interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'common' | 'suites' | 'experiences';
}

// Site images configuration
interface SiteImages {
  heroImage: string;
  aboutImage1: string;
  aboutImage2: string;
  locationImage: string;
}

const defaultSiteImages: SiteImages = {
  heroImage: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop',
  aboutImage1: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
  aboutImage2: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  locationImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
};

const defaultGalleryImages: GalleryImage[] = [
  { id: '1', src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', alt: 'Área da Piscina', category: 'common' },
  { id: '2', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', alt: 'Lobby', category: 'common' },
  { id: '3', src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80', alt: 'Restaurante', category: 'common' },
  { id: '4', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', alt: 'Jardim', category: 'common' },
  { id: '5', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', alt: 'Lounge', category: 'common' },
  { id: '6', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', alt: 'Suíte Standard', category: 'suites' },
  { id: '7', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', alt: 'Suíte Deluxe', category: 'suites' },
  { id: '8', src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80', alt: 'Master Suite', category: 'suites' },
  { id: '9', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', alt: 'Praia', category: 'experiences' },
  { id: '10', src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', alt: 'Duna do Pôr do Sol', category: 'experiences' },
];

const Admin: React.FC = () => {
  const {
    isAuthenticated,
    isSetupComplete,
    login,
    logout,
    setupCredentials,
    updateCredentials,
    content,
    updateContent,
    suites,
    addSuite,
    deleteSuite,
    updateSuite
  } = useContent();
  const { language } = useLanguage();

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'content' | 'suites' | 'images' | 'gallery' | 'settings'>('suites');
  const [newSuite, setNewSuite] = useState<Partial<Suite>>({
    title: '', price: '', desc: '', image: ''
  });

  // Site images state
  const [siteImages, setSiteImages] = useState<SiteImages>(() => {
    const saved = localStorage.getItem('jeri_site_images');
    return saved ? JSON.parse(saved) : defaultSiteImages;
  });

  // Gallery images state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
    const saved = localStorage.getItem('jeri_gallery_images');
    return saved ? JSON.parse(saved) : defaultGalleryImages;
  });

  // New gallery image form
  const [newGalleryImage, setNewGalleryImage] = useState<Partial<GalleryImage>>({
    src: '', alt: '', category: 'common'
  });

  // Editing Amenity State
  const [editingAmenity, setEditingAmenity] = useState<{ id: string | 'new', idx: number } | null>(null);
  const [editAmenityValue, setEditAmenityValue] = useState("");

  // Edit gallery image
  const [editingImageId, setEditingImageId] = useState<string | null>(null);

  const [gallerySaved, setGallerySaved] = useState(false);

  // Settings - credential update
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [credentialsSaved, setCredentialsSaved] = useState(false);

  // Save site images to localStorage
  const saveSiteImages = () => {
    localStorage.setItem('jeri_site_images', JSON.stringify(siteImages));
    alert(l.imagesSaved);
  };

  // Save gallery images to localStorage
  const saveGalleryImages = () => {
    localStorage.setItem('jeri_gallery_images', JSON.stringify(galleryImages));
    setGallerySaved(true);
    setTimeout(() => setGallerySaved(false), 3000);
  };

  const [contentSaved, setContentSaved] = useState(false);
  const handleSaveContent = () => {
    // The context already triggers localstorage save, so we just provide visual feedback
    setContentSaved(true);
    setTimeout(() => setContentSaved(false), 3000);
  };

  // Add gallery image
  const addGalleryImage = () => {
    if (newGalleryImage.src && newGalleryImage.alt) {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        src: newGalleryImage.src!,
        alt: newGalleryImage.alt!,
        category: newGalleryImage.category as 'common' | 'suites' | 'experiences' || 'common'
      };
      setGalleryImages(prev => [...prev, newImage]);
      setNewGalleryImage({ src: '', alt: '', category: 'common' });
    }
  };

  // Delete gallery image
  const deleteGalleryImage = (id: string) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
  };

  // Update gallery image
  const updateGalleryImage = (updated: GalleryImage) => {
    setGalleryImages(prev => prev.map(img => img.id === updated.id ? updated : img));
    setEditingImageId(null);
  };

  // Save new credentials
  const handleUpdateCredentials = () => {
    if (newEmail && newPassword) {
      const success = updateCredentials(newEmail, newPassword);
      if (success) {
        setCredentialsSaved(true);
        setNewEmail('');
        setNewPassword('');
        setTimeout(() => setCredentialsSaved(false), 3000);
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, onBase64Read: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          onBase64Read(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Labels based on language
  const labels = {
    pt: {
      title: 'Área Administrativa',
      panelTitle: 'Painel de Controle',
      // Setup screen
      setupTitle: 'Configuração Inicial',
      setupHint: 'Crie suas credenciais de acesso ao painel administrativo.',
      emailLabel: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Mínimo 6 caracteres',
      confirmPasswordLabel: 'Confirmar Senha',
      confirmPasswordPlaceholder: 'Digite a senha novamente',
      createAccount: 'Criar Acesso',
      passwordMismatch: 'As senhas não coincidem',
      passwordTooShort: 'A senha deve ter pelo menos 6 caracteres',
      // Login screen
      loginTitle: 'Acesso Administrativo',
      loginHint: 'Entre com suas credenciais para gerenciar o site.',
      enter: 'Entrar',
      invalidCredentials: 'E-mail ou senha incorretos',
      logout: 'Sair',
      // Tabs
      suites: 'Suítes',
      siteTexts: 'Textos do Site',
      siteImages: 'Imagens do Site',
      gallery: 'Galeria',
      settings: 'Configurações',
      // Suites
      manageSuites: 'Gerenciar Acomodações',
      addNewSuite: 'Adicionar Nova Suíte',
      suiteName: 'Nome da Suíte',
      price: 'Preço (ex: R$ 500)',
      imageUrl: 'URL da Imagem',
      description: 'Descrição',
      add: 'Adicionar',
      // Content
      heroTitle: 'Título da Hero (Capa)',
      heroSubtitle: 'Subtítulo da Hero',
      aboutTitle: 'Título Sobre',
      paragraph1: 'Parágrafo 1',
      paragraph2: 'Parágrafo 2',
      // Images
      heroImage: 'Imagem Principal (Hero)',
      aboutImage: 'Imagem da Seção Sobre',
      locationImage: 'Imagem de Localização',
      saveImages: 'Salvar Imagens',
      imagePreview: 'Pré-visualização',
      imagesSaved: 'Imagens salvas com sucesso!',
      // Gallery
      manageGallery: 'Gerenciar Galeria',
      addNewImage: 'Adicionar Nova Imagem',
      imageTitle: 'Título/Descrição da Imagem',
      category: 'Categoria',
      categoryCommon: 'Áreas Comuns',
      categorySuites: 'Suítes',
      categoryExperiences: 'Experiências',
      saveGallery: 'Salvar Galeria',
      gallerySaved: 'Galeria salva com sucesso!',
      editImage: 'Editar',
      deleteImage: 'Excluir',
      cancel: 'Cancelar',
      save: 'Salvar',
      totalImages: 'Total de imagens',
      // Settings
      settingsTitle: 'Configurações',
      credentialsSection: 'Alterar Credenciais',
      credentialsHint: 'Atualize seu e-mail e senha de acesso.',
      newEmailLabel: 'Novo E-mail',
      newPasswordLabel: 'Nova Senha',
      updateCredentials: 'Atualizar Credenciais',
      credentialsSaved: 'Credenciais atualizadas!',
      openaiConfig: 'Configuração OpenAI',
      apiKeyLabel: 'Chave da API OpenAI',
      apiKeyHint: 'Insira sua chave da API para ativar o chatbot com IA.',
      apiKeyPlaceholder: 'sk-...',
      saveApiKey: 'Salvar Chave',
      apiKeySaved: 'Chave salva com sucesso!',
    },
    en: {
      title: 'Admin Area',
      panelTitle: 'Control Panel',
      // Setup screen
      setupTitle: 'Initial Setup',
      setupHint: 'Create your admin panel access credentials.',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'At least 6 characters',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Enter password again',
      createAccount: 'Create Access',
      passwordMismatch: 'Passwords do not match',
      passwordTooShort: 'Password must be at least 6 characters',
      // Login screen
      loginTitle: 'Admin Access',
      loginHint: 'Enter your credentials to manage the site.',
      enter: 'Enter',
      invalidCredentials: 'Invalid email or password',
      logout: 'Logout',
      // Tabs
      suites: 'Suites',
      siteTexts: 'Site Texts',
      siteImages: 'Site Images',
      gallery: 'Gallery',
      settings: 'Settings',
      // Suites
      manageSuites: 'Manage Accommodations',
      addNewSuite: 'Add New Suite',
      suiteName: 'Suite Name',
      price: 'Price (e.g. $500)',
      imageUrl: 'Image URL',
      description: 'Description',
      add: 'Add',
      // Content
      heroTitle: 'Hero Title (Cover)',
      heroSubtitle: 'Hero Subtitle',
      aboutTitle: 'About Title',
      paragraph1: 'Paragraph 1',
      paragraph2: 'Paragraph 2',
      // Images
      heroImage: 'Main Image (Hero)',
      aboutImage: 'About Section Image',
      locationImage: 'Location Image',
      saveImages: 'Save Images',
      imagePreview: 'Preview',
      imagesSaved: 'Images saved successfully!',
      // Gallery
      manageGallery: 'Manage Gallery',
      addNewImage: 'Add New Image',
      imageTitle: 'Image Title/Description',
      category: 'Category',
      categoryCommon: 'Common Areas',
      categorySuites: 'Suites',
      categoryExperiences: 'Experiences',
      saveGallery: 'Save Gallery',
      gallerySaved: 'Gallery saved successfully!',
      editImage: 'Edit',
      deleteImage: 'Delete',
      cancel: 'Cancel',
      save: 'Save',
      totalImages: 'Total images',
      // Settings
      settingsTitle: 'Settings',
      credentialsSection: 'Change Credentials',
      credentialsHint: 'Update your access email and password.',
      newEmailLabel: 'New Email',
      newPasswordLabel: 'New Password',
      updateCredentials: 'Update Credentials',
      credentialsSaved: 'Credentials updated!',
      openaiConfig: 'OpenAI Configuration',
      apiKeyLabel: 'OpenAI API Key',
      apiKeyHint: 'Enter your API key to enable the AI chatbot.',
      apiKeyPlaceholder: 'sk-...',
      saveApiKey: 'Save Key',
      apiKeySaved: 'Key saved successfully!',
    },
    es: {
      title: 'Área Administrativa',
      panelTitle: 'Panel de Control',
      // Setup screen
      setupTitle: 'Configuración Inicial',
      setupHint: 'Crea tus credenciales de acceso al panel administrativo.',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'tu@email.com',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Mínimo 6 caracteres',
      confirmPasswordLabel: 'Confirmar Contraseña',
      confirmPasswordPlaceholder: 'Ingresa la contraseña nuevamente',
      createAccount: 'Crear Acceso',
      passwordMismatch: 'Las contraseñas no coinciden',
      passwordTooShort: 'La contraseña debe tener al menos 6 caracteres',
      // Login screen
      loginTitle: 'Acceso Administrativo',
      loginHint: 'Ingresa tus credenciales para administrar el sitio.',
      enter: 'Entrar',
      invalidCredentials: 'Correo o contraseña incorrectos',
      logout: 'Salir',
      // Tabs
      suites: 'Suites',
      siteTexts: 'Textos del Sitio',
      siteImages: 'Imágenes del Sitio',
      gallery: 'Galería',
      settings: 'Configuración',
      // Suites
      manageSuites: 'Gestionar Alojamientos',
      addNewSuite: 'Agregar Nueva Suite',
      suiteName: 'Nombre de la Suite',
      price: 'Precio (ej: $500)',
      imageUrl: 'URL de la Imagen',
      description: 'Descripción',
      add: 'Agregar',
      // Content
      heroTitle: 'Título del Hero (Portada)',
      heroSubtitle: 'Subtítulo del Hero',
      aboutTitle: 'Título Sobre',
      paragraph1: 'Párrafo 1',
      paragraph2: 'Párrafo 2',
      // Images
      heroImage: 'Imagen Principal (Hero)',
      aboutImage: 'Imagen de la Sección Sobre',
      locationImage: 'Imagen de Ubicación',
      saveImages: 'Guardar Imágenes',
      imagePreview: 'Vista previa',
      imagesSaved: '¡Imágenes guardadas con éxito!',
      // Gallery
      manageGallery: 'Gestionar Galería',
      addNewImage: 'Agregar Nueva Imagen',
      imageTitle: 'Título/Descripción de la Imagen',
      category: 'Categoría',
      categoryCommon: 'Áreas Comunes',
      categorySuites: 'Suites',
      categoryExperiences: 'Experiencias',
      saveGallery: 'Guardar Galería',
      gallerySaved: '¡Galería guardada con éxito!',
      editImage: 'Editar',
      deleteImage: 'Eliminar',
      cancel: 'Cancelar',
      save: 'Guardar',
      totalImages: 'Total de imágenes',
      // Settings
      settingsTitle: 'Configuración',
      credentialsSection: 'Cambiar Credenciales',
      credentialsHint: 'Actualiza tu correo y contraseña de acceso.',
      newEmailLabel: 'Nuevo Correo',
      newPasswordLabel: 'Nueva Contraseña',
      updateCredentials: 'Actualizar Credenciales',
      credentialsSaved: '¡Credenciales actualizadas!',
      openaiConfig: 'Configuración OpenAI',
      apiKeyLabel: 'Clave de API OpenAI',
      apiKeyHint: 'Ingresa tu clave de API para activar el chatbot con IA.',
      apiKeyPlaceholder: 'sk-...',
      saveApiKey: 'Guardar Clave',
      apiKeySaved: '¡Clave guardada con éxito!',
    },
  };

  const l = labels[language as keyof typeof labels] || labels.pt;

  // Category badge colors
  const categoryColors = {
    common: 'bg-blue-100 text-blue-700',
    suites: 'bg-purple-100 text-purple-700',
    experiences: 'bg-green-100 text-green-700',
  };

  const categoryLabels = {
    common: l.categoryCommon,
    suites: l.categorySuites,
    experiences: l.categoryExperiences,
  };


  // LOGIN SCREEN
  if (!isAuthenticated) {
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError('');

      const success = login(email, password);
      if (!success) {
        setLoginError(l.invalidCredentials);
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-sand-50 pt-20">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-slate-200">
          <div className="text-center mb-8">
            <Lock className="w-12 h-12 text-brand-500 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-brand-900">{l.loginTitle}</h2>
            <p className="text-slate-500 mt-2">{l.loginHint}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{l.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={l.emailPlaceholder}
                  required
                  className="w-full pl-10 p-3 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">{l.passwordLabel}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={l.passwordPlaceholder}
                  required
                  className="w-full pl-10 p-3 border border-slate-300 rounded focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}
            <button type="submit" className="w-full bg-brand-900 text-white py-3 rounded hover:bg-brand-700 transition-colors">
              {l.enter}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const handleAddSuite = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSuite.title && newSuite.price) {
      addSuite({
        id: Date.now().toString(),
        title: newSuite.title!,
        price: newSuite.price!,
        desc: newSuite.desc || '',
        image: newSuite.image || 'https://via.placeholder.com/800x600?text=Nova+Suite'
      });
      setNewSuite({ title: '', price: '', desc: '', image: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-6">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-900 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8" /> {l.panelTitle}
          </h1>
          <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium">{l.logout}</button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('suites')}
              className={`w-full text-left p-4 rounded flex items-center gap-3 transition-colors ${activeTab === 'suites' ? 'bg-brand-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <BedDouble size={20} /> {l.suites}
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full text-left p-4 rounded flex items-center gap-3 transition-colors ${activeTab === 'gallery' ? 'bg-brand-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <Images size={20} /> {l.gallery}
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`w-full text-left p-4 rounded flex items-center gap-3 transition-colors ${activeTab === 'content' ? 'bg-brand-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <FileText size={20} /> {l.siteTexts}
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`w-full text-left p-4 rounded flex items-center gap-3 transition-colors ${activeTab === 'images' ? 'bg-brand-900 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <Image size={20} /> {l.siteImages}
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white p-8 rounded-xl shadow-sm border border-slate-200">

            {/* SUITES TAB */}
            {activeTab === 'suites' && (
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-900">{l.manageSuites}</h2>

                {/* Add Form */}
                <form onSubmit={handleAddSuite} className="bg-slate-50 p-6 rounded-lg mb-8 border border-slate-200">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-slate-500">{l.addNewSuite}</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      placeholder={l.suiteName}
                      className="p-2 border rounded"
                      value={newSuite.title}
                      onChange={e => setNewSuite({ ...newSuite, title: e.target.value })}
                    />
                    <input
                      placeholder={l.price}
                      className="p-2 border rounded"
                      value={newSuite.price}
                      onChange={e => setNewSuite({ ...newSuite, price: e.target.value })}
                    />
                    <div className="md:col-span-2">
                      <label className="text-xs text-slate-500 font-bold uppercase flex justify-between items-center mb-1">
                        <span>{l.imageUrl}</span>
                        <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 font-normal normal-case">
                          <Upload size={14} /> Importar Nova Imagem
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setNewSuite({ ...newSuite, image: base64 }))} />
                        </label>
                      </label>
                      <input
                        placeholder="https://..."
                        className="p-2 border rounded w-full"
                        value={newSuite.image}
                        onChange={e => setNewSuite({ ...newSuite, image: e.target.value })}
                      />
                    </div>
                    <textarea
                      placeholder={l.description}
                      className="p-2 border rounded md:col-span-2"
                      value={newSuite.desc}
                      onChange={e => setNewSuite({ ...newSuite, desc: e.target.value })}
                    />
                    <textarea
                      placeholder="Descrição Completa (opcional)"
                      className="p-2 border rounded md:col-span-2 h-20"
                      value={newSuite.fullDesc || ''}
                      onChange={e => setNewSuite({ ...newSuite, fullDesc: e.target.value })}
                    />
                     <div className="md:col-span-2">
                       <label className="text-xs text-slate-500 font-bold uppercase block mb-2">Comodidades (Selecione ou Edite os nomes)</label>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4 border rounded bg-white max-h-56 overflow-y-auto">
                         {content.globalAmenities?.map((amenity, idx) => {
                           const isChecked = newSuite.features?.includes(amenity) || false;
                           const isEditing = editingAmenity?.id === 'new' && editingAmenity?.idx === idx;
                           
                           return (
                             <div key={idx} className="flex items-center gap-2 text-sm p-1 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200">
                               {isEditing ? (
                                 <div className="flex items-center gap-2 w-full">
                                    <input 
                                       autoFocus
                                       value={editAmenityValue}
                                       onChange={(e) => setEditAmenityValue(e.target.value)}
                                       className="flex-1 p-1 border border-brand-500 rounded outline-none text-xs" 
                                    />
                                    <button 
                                      type="button"
                                      title="Salvar Nome"
                                      onClick={() => {
                                          if (!editAmenityValue.trim() || editAmenityValue === amenity) {
                                              setEditingAmenity(null);
                                              return;
                                          }
                                          const newVal = editAmenityValue.trim();
                                          const newGlobals = [...(content.globalAmenities || [])];
                                          newGlobals[idx] = newVal;
                                          
                                          let currentFeatures = [...(newSuite.features || [])];
                                          if (currentFeatures.includes(amenity)) {
                                             currentFeatures = currentFeatures.map(f => f === amenity ? newVal : f);
                                             setNewSuite({ ...newSuite, features: currentFeatures });
                                          }
                                          updateContent({ ...content, globalAmenities: newGlobals });
                                          setEditingAmenity(null);
                                      }}
                                      className="p-1 text-white bg-green-500 rounded hover:bg-green-600"
                                    >
                                      <Check size={14} />
                                    </button>
                                 </div>
                               ) : (
                                 <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 pr-2">
                                   <input
                                     type="checkbox"
                                     checked={isChecked}
                                     onChange={(e) => {
                                       const currentFeatures = newSuite.features || [];
                                       if (e.target.checked) {
                                         setNewSuite({ ...newSuite, features: [...currentFeatures, amenity] });
                                       } else {
                                         setNewSuite({ ...newSuite, features: currentFeatures.filter(f => f !== amenity) });
                                       }
                                     }}
                                     className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 flex-shrink-0"
                                   />
                                   <span className="text-slate-700 truncate select-none" title={amenity}>{amenity}</span>
                                 </label>
                               )}
                               {!isEditing && (
                                   <button 
                                     type="button" 
                                     title="Editar Comodidade"
                                     onClick={() => {
                                         setEditingAmenity({ id: 'new', idx });
                                         setEditAmenityValue(amenity);
                                     }}
                                     className="text-slate-400 hover:text-brand-600 p-1"
                                   >
                                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                   </button>
                               )}
                             </div>
                           );
                         })}
                       </div>
                     </div>
                   </div>
                   <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                    <Plus size={16} /> {l.add}
                  </button>
                </form>

                {/* List */}
                <div className="space-y-4">
                  {suites.map(suite => (
                    <div key={suite.id} className="flex flex-col gap-4 p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        <img src={suite.image} alt="" className="w-32 h-32 object-cover rounded bg-slate-200 border" />
                        <div className="flex-1 space-y-3">
                          <div className="flex gap-4">
                            <div className="flex-1">
                              <label className="text-xs text-slate-500 font-bold uppercase block mb-1">{l.suiteName}</label>
                              <input
                                value={suite.title}
                                onChange={(e) => updateSuite({ ...suite, title: e.target.value })}
                                className="font-bold text-lg p-2 border rounded focus:border-brand-500 outline-none w-full bg-slate-50"
                              />
                            </div>
                            <div className="w-1/3">
                              <label className="text-xs text-slate-500 font-bold uppercase block mb-1">{l.price}</label>
                              <input
                                value={suite.price}
                                onChange={(e) => updateSuite({ ...suite, price: e.target.value })}
                                className="text-brand-500 text-sm p-2 border rounded focus:border-brand-500 outline-none w-full bg-slate-50"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-bold uppercase flex justify-between items-center mb-1">
                              <span>{l.imageUrl}</span>
                              <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 font-normal normal-case">
                                <Upload size={14} /> Alterar Imagem
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => updateSuite({ ...suite, image: base64 }))} />
                              </label>
                            </label>
                            <input
                              value={suite.image}
                              onChange={(e) => updateSuite({ ...suite, image: e.target.value })}
                              className="text-sm p-2 border rounded focus:border-brand-500 outline-none w-full bg-slate-50 text-slate-600"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-bold uppercase block mb-1">{l.description}</label>
                            <textarea
                              value={suite.desc}
                              onChange={(e) => updateSuite({ ...suite, desc: e.target.value })}
                              className="text-sm p-2 border rounded focus:border-brand-500 outline-none w-full bg-slate-50 text-slate-600 h-20"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-bold uppercase block mb-1">Descrição Completa</label>
                            <textarea
                              value={suite.fullDesc || ''}
                              onChange={(e) => updateSuite({ ...suite, fullDesc: e.target.value })}
                              className="text-sm p-2 border rounded focus:border-brand-500 outline-none w-full bg-slate-50 text-slate-600 h-32"
                              placeholder="Descrição detalhada sobre o conforto e decoração da suíte..."
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-bold uppercase flex justify-between items-center mb-1">
                              <span>Fotos da Galeria (URLs separadas por vírgula)</span>
                              <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 font-normal normal-case">
                                <Upload size={14} /> Adicionar Foto Local
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => {
                                  const currentGallery = suite.gallery || [];
                                  updateSuite({ ...suite, gallery: [...currentGallery, base64] });
                                })} />
                              </label>
                            </label>
                            <textarea
                              value={suite.gallery?.join(', ') || ''}
                              onChange={(e) => updateSuite({ ...suite, gallery: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                              className="text-sm p-2 border rounded focus:border-brand-500 outline-none w-full bg-slate-50 text-slate-600 h-16 font-mono"
                              placeholder="/suites/suite1/2.jpeg, /suites/suite1/3.jpeg"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-500 font-bold uppercase block mb-2">Comodidades (Selecione ou Edite os nomes)</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border rounded bg-white h-44 overflow-y-auto w-full">
                              {content.globalAmenities?.map((amenity, idx) => {
                                const isChecked = suite.features?.includes(amenity) || false;
                                const isEditing = editingAmenity?.id === suite.id && editingAmenity?.idx === idx;

                                return (
                                  <div key={idx} className="flex items-center gap-2 text-sm p-1 rounded hover:bg-slate-50 border border-transparent hover:border-slate-200">
                                     {isEditing ? (
                                       <div className="flex items-center gap-2 w-full">
                                          <input 
                                             autoFocus
                                             value={editAmenityValue}
                                             onChange={(e) => setEditAmenityValue(e.target.value)}
                                             className="flex-1 p-1 border border-brand-500 rounded outline-none text-xs" 
                                          />
                                          <button 
                                            type="button"
                                            title="Salvar Nome"
                                            onClick={() => {
                                                if (!editAmenityValue.trim() || editAmenityValue === amenity) {
                                                    setEditingAmenity(null);
                                                    return;
                                                }
                                                const newVal = editAmenityValue.trim();
                                                const newGlobals = [...(content.globalAmenities || [])];
                                                newGlobals[idx] = newVal;
                                                
                                                let currentFeatures = [...(suite.features || [])];
                                                if (currentFeatures.includes(amenity)) {
                                                   currentFeatures = currentFeatures.map(f => f === amenity ? newVal : f);
                                                   updateSuite({ ...suite, features: currentFeatures });
                                                }
                                                updateContent({ ...content, globalAmenities: newGlobals });
                                                setEditingAmenity(null);
                                            }}
                                            className="p-1 text-white bg-green-500 rounded hover:bg-green-600"
                                          >
                                            <Check size={14} />
                                          </button>
                                       </div>
                                     ) : (
                                        <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 pr-2">
                                          <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={(e) => {
                                              const currentFeatures = suite.features || [];
                                              if (e.target.checked) {
                                                updateSuite({ ...suite, features: [...currentFeatures, amenity] });
                                              } else {
                                                updateSuite({ ...suite, features: currentFeatures.filter(f => f !== amenity) });
                                              }
                                            }}
                                            className="w-4 h-4 text-brand-600 rounded focus:ring-brand-500 flex-shrink-0"
                                          />
                                          <span className="text-slate-700 truncate select-none" title={amenity}>{amenity}</span>
                                        </label>
                                     )}
                                     {!isEditing && (
                                         <button 
                                           type="button" 
                                           title="Editar Comodidade"
                                           onClick={() => {
                                               setEditingAmenity({ id: suite.id, idx });
                                               setEditAmenityValue(amenity);
                                           }}
                                           className="text-slate-400 hover:text-brand-600 p-1"
                                         >
                                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                         </button>
                                     )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <button onClick={() => deleteSuite(suite.id)} className="p-2 text-red-500 hover:bg-red-50 rounded" title="Excluir Suite">
                            <Trash2 size={24} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY TAB */}
            {activeTab === 'gallery' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-brand-900">
                    <Images size={24} /> {l.manageGallery}
                  </h2>
                  <span className="text-sm text-slate-500">{l.totalImages}: {galleryImages.length}</span>
                </div>

                {/* Add New Image Form */}
                <div className="bg-slate-50 p-6 rounded-lg mb-8 border border-slate-200">
                  <h3 className="font-bold mb-4 text-sm uppercase tracking-wide text-slate-500">{l.addNewImage}</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="text-xs text-slate-500 font-bold uppercase flex justify-between items-center mb-1">
                        <span>{l.imageUrl}</span>
                        <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 font-normal normal-case">
                          <Upload size={14} /> Importar Nova Imagem
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setNewGalleryImage({ ...newGalleryImage, src: base64 }))} />
                        </label>
                      </label>
                      <input
                        placeholder={l.imageUrl}
                        className="p-2 border rounded w-full"
                        value={newGalleryImage.src}
                        onChange={e => setNewGalleryImage({ ...newGalleryImage, src: e.target.value })}
                      />
                    </div>
                    <select
                      className="p-2 border rounded"
                      value={newGalleryImage.category}
                      onChange={e => setNewGalleryImage({ ...newGalleryImage, category: e.target.value as any })}
                    >
                      <option value="common">{l.categoryCommon}</option>
                      <option value="suites">{l.categorySuites}</option>
                      <option value="experiences">{l.categoryExperiences}</option>
                    </select>
                    <input
                      placeholder={l.imageTitle}
                      className="p-2 border rounded md:col-span-3"
                      value={newGalleryImage.alt}
                      onChange={e => setNewGalleryImage({ ...newGalleryImage, alt: e.target.value })}
                    />
                  </div>
                  {newGalleryImage.src && (
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-1">{l.imagePreview}:</p>
                      <img src={newGalleryImage.src} alt="Preview" className="w-32 h-24 object-cover rounded border" />
                    </div>
                  )}
                  <button
                    onClick={addGalleryImage}
                    disabled={!newGalleryImage.src || !newGalleryImage.alt}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} /> {l.add}
                  </button>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {galleryImages.map(img => (
                    <div key={img.id} className="relative group border rounded-lg overflow-hidden">
                      <img src={img.src} alt={img.alt} className="w-full h-32 object-cover" />

                      {/* Category Badge */}
                      <span className={`absolute top-2 left-2 text-xs px-2 py-1 rounded ${categoryColors[img.category]}`}>
                        {categoryLabels[img.category]}
                      </span>

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => setEditingImageId(img.id)}
                          className="p-2 bg-white rounded-full text-blue-600 hover:bg-blue-50"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteGalleryImage(img.id)}
                          className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Title */}
                      <div className="p-2 bg-white">
                        <p className="text-xs text-slate-600 truncate">{img.alt}</p>
                      </div>

                      {/* Edit Modal */}
                      {editingImageId === img.id && (
                        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setEditingImageId(null)}>
                          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-bold text-lg">{l.editImage}</h3>
                              <button onClick={() => setEditingImageId(null)}>
                                <X size={20} />
                              </button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="flex justify-between items-center mb-1">
                                  <span className="text-sm font-medium">{l.imageUrl}</span>
                                  <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 text-xs">
                                    <Upload size={14} /> Importar Local
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => updateGalleryImage({ ...img, src: base64 }))} />
                                  </label>
                                </label>
                                <input
                                  className="w-full p-2 border rounded"
                                  value={img.src}
                                  onChange={e => updateGalleryImage({ ...img, src: e.target.value })}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">{l.imageTitle}</label>
                                <input
                                  className="w-full p-2 border rounded"
                                  value={img.alt}
                                  onChange={e => updateGalleryImage({ ...img, alt: e.target.value })}
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">{l.category}</label>
                                <select
                                  className="w-full p-2 border rounded"
                                  value={img.category}
                                  onChange={e => updateGalleryImage({ ...img, category: e.target.value as any })}
                                >
                                  <option value="common">{l.categoryCommon}</option>
                                  <option value="suites">{l.categorySuites}</option>
                                  <option value="experiences">{l.categoryExperiences}</option>
                                </select>
                              </div>
                              <img src={img.src} alt="" className="w-full h-40 object-cover rounded" />
                              <button
                                onClick={() => setEditingImageId(null)}
                                className="w-full bg-brand-900 text-white py-2 rounded hover:bg-brand-700"
                              >
                                {l.save}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={saveGalleryImages}
                    className="bg-brand-900 text-white px-6 py-3 rounded hover:bg-brand-700 transition-colors flex items-center gap-2"
                  >
                    <Save size={18} /> {l.saveGallery}
                  </button>
                  {gallerySaved && (
                    <span className="text-green-600 flex items-center gap-1 animate-fade-in">
                      <CheckCircle size={18} /> {l.gallerySaved}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* CONTENT TAB */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-900">{l.siteTexts}</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{l.heroTitle}</label>
                    <input
                      className="w-full p-2 border rounded"
                      value={content.heroTitle}
                      onChange={(e) => updateContent({ ...content, heroTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{l.heroSubtitle}</label>
                    <input
                      className="w-full p-2 border rounded"
                      value={content.heroSubtitle}
                      onChange={(e) => updateContent({ ...content, heroSubtitle: e.target.value })}
                    />
                  </div>
                  <hr className="my-6" />
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{l.aboutTitle}</label>
                    <input
                      className="w-full p-2 border rounded"
                      value={content.aboutTitle}
                      onChange={(e) => updateContent({ ...content, aboutTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{l.paragraph1}</label>
                    <textarea
                      className="w-full p-2 border rounded h-24"
                      value={content.aboutText1}
                      onChange={(e) => updateContent({ ...content, aboutText1: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{l.paragraph2}</label>
                    <textarea
                      className="w-full p-2 border rounded h-24"
                      value={content.aboutText2}
                      onChange={(e) => updateContent({ ...content, aboutText2: e.target.value })}
                    />
                  </div>
                  <hr className="my-6" />
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Título da Seção de Comodidades</label>
                    <input
                      className="w-full p-2 border rounded"
                      value={content.amenitiesTitle || 'Comodidades'}
                      onChange={(e) => updateContent({ ...content, amenitiesTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Itens Globais de Comodidades (Separados por vírgula)</label>
                    <p className="text-xs text-slate-500 mb-2">Defina aqui as opções que irão aparecer como caixinhas (checkboxes) para marcar em cada suíte.</p>
                    <textarea
                      className="w-full p-2 border rounded h-24"
                      value={content.globalAmenities?.join(', ') || ''}
                      onChange={(e) => updateContent({ ...content, globalAmenities: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="Wi-Fi Alta Velocidade, Frigobar, Cofre Digital..."
                    />
                  </div>
                  <div className="pt-4 flex items-center gap-4 border-t mt-4">
                    <button
                      onClick={handleSaveContent}
                      className="bg-brand-900 text-white px-6 py-3 rounded hover:bg-brand-700 transition-colors flex items-center gap-2"
                    >
                      <Save size={18} /> Salvar Alterações
                    </button>
                    {contentSaved && (
                      <span className="text-green-600 flex items-center gap-1 animate-fade-in font-medium">
                        <CheckCircle size={18} /> Salvo com sucesso! As alterações já estão no ar.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* IMAGES TAB */}
            {activeTab === 'images' && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-900">
                  <Image size={24} /> {l.siteImages}
                </h2>

                {/* Hero Image */}
                <div className="space-y-3">
                  <label className="flex justify-between items-center mb-1">
                    <span className="block text-sm font-bold text-slate-700">{l.heroImage}</span>
                    <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 text-xs font-normal">
                      <Upload size={14} /> Importar Local
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setSiteImages({ ...siteImages, heroImage: base64 }))} />
                    </label>
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    value={siteImages.heroImage}
                    onChange={(e) => setSiteImages({ ...siteImages, heroImage: e.target.value })}
                    placeholder="https://..."
                  />
                  {siteImages.heroImage && (
                    <img src={siteImages.heroImage} alt="Hero Preview" className="w-full max-w-md h-40 object-cover rounded border" />
                  )}
                </div>

                {/* About Image */}
                <div className="space-y-3">
                  <label className="flex justify-between items-center mb-1">
                    <span className="block text-sm font-bold text-slate-700">{l.aboutImage}</span>
                    <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 text-xs font-normal">
                      <Upload size={14} /> Importar Local
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setSiteImages({ ...siteImages, aboutImage1: base64 }))} />
                    </label>
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    value={siteImages.aboutImage1}
                    onChange={(e) => setSiteImages({ ...siteImages, aboutImage1: e.target.value })}
                    placeholder="https://..."
                  />
                  {siteImages.aboutImage1 && (
                    <img src={siteImages.aboutImage1} alt="About Preview" className="w-full max-w-md h-40 object-cover rounded border" />
                  )}
                </div>

                {/* Location Image */}
                <div className="space-y-3">
                  <label className="flex justify-between items-center mb-1">
                    <span className="block text-sm font-bold text-slate-700">{l.locationImage}</span>
                    <label className="cursor-pointer text-brand-600 hover:text-brand-800 flex items-center gap-1 text-xs font-normal">
                      <Upload size={14} /> Importar Local
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, (base64) => setSiteImages({ ...siteImages, locationImage: base64 }))} />
                    </label>
                  </label>
                  <input
                    className="w-full p-2 border rounded"
                    value={siteImages.locationImage}
                    onChange={(e) => setSiteImages({ ...siteImages, locationImage: e.target.value })}
                    placeholder="https://..."
                  />
                  {siteImages.locationImage && (
                    <img src={siteImages.locationImage} alt="Location Preview" className="w-full max-w-md h-40 object-cover rounded border" />
                  )}
                </div>

                <button
                  onClick={saveSiteImages}
                  className="bg-brand-900 text-white px-6 py-3 rounded hover:bg-brand-700 transition-colors flex items-center gap-2"
                >
                  <Save size={18} /> {l.saveImages}
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;