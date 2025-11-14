import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Share2, 
  Heart, 
  MessageCircle, 
  Camera, 
  Download, 
  Copy, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Link,
  Users,
  Star,
  Bookmark,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Send,
  Image,
  Video,
  Music,
  FileText
} from "lucide-react";

interface SocialSharingProps {
  language: string;
  artworkId?: string;
  artworkTitle?: string;
  artworkImage?: string;
  onShare?: (platform: string, content: string) => void;
}

interface SocialPost {
  id: string;
  content: string;
  image?: string;
  timestamp: Date;
  likes: number;
  comments: number;
  shares: number;
  author: string;
  platform: string;
}

interface SocialStats {
  totalShares: number;
  totalLikes: number;
  totalComments: number;
  followers: number;
  following: number;
  posts: number;
}

export const SocialSharing = ({ 
  language, 
  artworkId, 
  artworkTitle, 
  artworkImage, 
  onShare 
}: SocialSharingProps) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [stats, setStats] = useState<SocialStats>({
    totalShares: 0,
    totalLikes: 0,
    totalComments: 0,
    followers: 0,
    following: 0,
    posts: 0
  });
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sharePlatform, setSharePlatform] = useState<string>('');

  const platforms = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'text-blue-700',
      bgColor: 'bg-blue-700'
    },
    {
      id: 'email',
      name: 'Email',
      icon: Mail,
      color: 'text-gray-600',
      bgColor: 'bg-gray-600'
    }
  ];

  useEffect(() => {
    // Charger les données sociales
    loadSocialData();
  }, []);

  const loadSocialData = () => {
    const savedPosts = localStorage.getItem('mcn-social-posts');
    const savedStats = localStorage.getItem('mcn-social-stats');
    
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
    
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  };

  const saveSocialData = () => {
    localStorage.setItem('mcn-social-posts', JSON.stringify(posts));
    localStorage.setItem('mcn-social-stats', JSON.stringify(stats));
  };

  const createPost = () => {
    if (!newPost.trim()) return;

    const post: SocialPost = {
      id: Date.now().toString(),
      content: newPost,
      image: selectedImage,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      author: 'Vous',
      platform: 'MCN Digital'
    };

    setPosts(prev => [post, ...prev]);
    setStats(prev => ({
      ...prev,
      posts: prev.posts + 1
    }));
    setNewPost('');
    setSelectedImage(null);
    saveSocialData();
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
    setStats(prev => ({
      ...prev,
      totalLikes: prev.totalLikes + 1
    }));
    saveSocialData();
  };

  const sharePost = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    setStats(prev => ({
      ...prev,
      totalShares: prev.totalShares + 1
    }));
    saveSocialData();
  };

  const shareToPlatform = (platform: string) => {
    const content = artworkTitle 
      ? `${language === 'fr' ? 'Découvrez cette œuvre' : language === 'en' ? 'Discover this artwork' : 'Gis bii liggéey'}: ${artworkTitle}`
      : newPost;
    
    const url = window.location.href;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(content)}&body=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
      onShare?.(platform, content);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Afficher une notification de succès
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes}min`;
    if (hours < 24) return `Il y a ${hours}h`;
    return `Il y a ${days}j`;
  };

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <Card className="bg-gradient-to-r from-accent/10 to-pink-500/10 border-2 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Share2 className="h-6 w-6 text-accent" />
              {language === 'fr' ? 'Partage Social' : language === 'en' ? 'Social Sharing' : 'Partage Social'}
            </h2>
            <Badge variant="outline" className="text-accent">
              {stats.followers} {language === 'fr' ? 'abonnés' : language === 'en' ? 'followers' : 'abonnés'}
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.posts}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Publications' : language === 'en' ? 'Posts' : 'Publications'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.totalLikes}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'J\'aime' : language === 'en' ? 'Likes' : 'Bari'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.totalShares}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Partages' : language === 'en' ? 'Shares' : 'Partages'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{stats.totalComments}</div>
              <div className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Commentaires' : language === 'en' ? 'Comments' : 'Commentaires'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Créer un post */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-accent" />
            {language === 'fr' ? 'Créer une publication' : language === 'en' ? 'Create a post' : 'Def benn publication'}
          </h3>
          
          <div className="space-y-4">
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={
                language === 'fr' ? 'Partagez votre expérience au musée...' : 
                language === 'en' ? 'Share your museum experience...' : 
                'Partager seen expérience ci musée...'
              }
              className="min-h-[100px]"
            />

            {selectedImage && (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="Image sélectionnée" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2"
                >
                  ×
                </Button>
              </div>
            )}

            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <Image className="h-4 w-4 mr-2" />
                    {language === 'fr' ? 'Image' : language === 'en' ? 'Image' : 'Image'}
                  </span>
                </Button>
              </label>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Partager' : language === 'en' ? 'Share' : 'Partager'}
              </Button>

              <Button
                onClick={createPost}
                disabled={!newPost.trim()}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                {language === 'fr' ? 'Publier' : language === 'en' ? 'Publish' : 'Publier'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plateformes de partage */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Link className="h-5 w-5 text-accent" />
            {language === 'fr' ? 'Partager sur' : language === 'en' ? 'Share on' : 'Partager ci'}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant="outline"
                onClick={() => shareToPlatform(platform.id)}
                className={`h-20 flex flex-col items-center gap-2 hover:${platform.bgColor} hover:text-white`}
              >
                <platform.icon className="h-6 w-6" />
                <span className="text-xs">{platform.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feed des publications */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Users className="h-5 w-5 text-accent" />
          {language === 'fr' ? 'Feed Communautaire' : language === 'en' ? 'Community Feed' : 'Feed Communautaire'}
        </h3>

        {posts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {language === 'fr' ? 'Aucune publication pour le moment' : 
                 language === 'en' ? 'No posts yet' : 
                 'Amul publication ci waxtu'}
              </p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-bold">
                    {post.author.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{post.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.platform}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(post.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-3">{post.content}</p>
                    
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt="Post image" 
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                    )}
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => likePost(post.id)}
                        className="flex items-center gap-2"
                      >
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => sharePost(post.id)}
                        className="flex items-center gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        {post.shares}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(post.content)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        {language === 'fr' ? 'Copier' : language === 'en' ? 'Copy' : 'Copier'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
