const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold">Our Story</h1>
          <p className="text-xl text-muted-foreground">
            Where elegance meets modern sophistication
          </p>
        </div>
        
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to Vogue Collection, where we believe every woman deserves to feel confident, 
            elegant, and beautiful in what she wears. Founded with a passion for timeless design 
            and exceptional quality, we curate a collection of dresses that celebrate the modern woman.
          </p>
          
          <p>
            Our journey began with a simple vision: to create a destination where women could find 
            sophisticated dresses that seamlessly transition from day to night, from work to weekend, 
            and from casual moments to special occasions.
          </p>
          
          <p>
            Each piece in our collection is carefully selected for its quality, craftsmanship, and 
            timeless appeal. We work with talented designers who share our commitment to creating 
            pieces that empower women to express their unique style with confidence.
          </p>
          
          <div className="bg-muted/50 p-8 rounded-lg space-y-4 my-8">
            <h2 className="text-2xl font-semibold">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="font-semibold mr-2">Quality:</span>
                <span>We never compromise on the quality of materials and craftsmanship.</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Elegance:</span>
                <span>Timeless designs that transcend fleeting trends.</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Empowerment:</span>
                <span>Fashion that makes you feel confident and beautiful.</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold mr-2">Sustainability:</span>
                <span>Conscious choices for a better future.</span>
              </li>
            </ul>
          </div>
          
          <p>
            Thank you for being part of our journey. We're honored to be a part of your story 
            and look forward to helping you discover pieces that make you feel extraordinary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
