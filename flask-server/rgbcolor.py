


import re



def is_hex_color(string):
  """Returns True if string is a valid hexadecimal color ("#XXX" or "#XXXXXX")."""
  return True if re.search("^#(?:[0-9a-fA-F]{3}){1,2}$", string) else False





class RgbColor(object):

  def __init__(self, hexstr):
    if not is_hex_color(hexstr):
      errstr = '__init__() takes 1 hex-format color string as an argument'
      raise TypeError(errstr)
    else:
      if len(hexstr) == 7:
        self.r = int(hexstr[1:3], 16)
        self.g = int(hexstr[3:5], 16)
        self.b = int(hexstr[5:7], 16)
      elif len(hexstr) == 4:
        self.r = int(hexstr[1]+hexstr[1], 16)
        self.g = int(hexstr[2]+hexstr[2], 16)
        self.b = int(hexstr[3]+hexstr[3], 16)

      # Sets the starting att for the next() method
      self.current_att = 'r'

  @classmethod
  def from_str(cls, hexstr):
    """Creates and returns a RgbColor object from a hex-format color string"""
    return RgbColor(hexstr)

  @classmethod
  def from_list(cls, rgblist):
    """Creates and returns a RgbColor object from decimal RGB values in rgblist"""
    if len(rgblist) != 3 or not all(type(i) is int for i in rgblist) or not all(0 <= i <= 255 for i in rgblist):
      errstr = 'from_list() takes 1 list of 3 integers in the range [0,255] as an argument'
      raise TypeError(errstr)
    else:
      return RgbColor('#' + ''.join([format(i, '02X') for i in rgblist]))

  @classmethod
  def from_dec(cls, r, g, b):
    """Creates and returns a RgbColor object from decimal RGB values as args"""
    return RgbColor('#' + ''.join([format(i, '02X') for i in [r,g,b]]))



  def __repr__(self):
    return self.to_str()
    #return 'RgbColor({}, {}, {})'.format(self.r, self.g, self.b)


  # Equality is satisfied if two RgbColors have the same r, g, and b attributes.
  def __eq__(self, other):
    return self.r == other.r and self.g == other.g and self.b == other.b
  def __ne__(self, other):
    return not(self == other)



  # This distance definition is an instance method takes another RgbColor object:
  #   color1.distfrom(color2)
  def distfrom(self, other):
    """Returns the Euclidean distance between this and other in RGB space"""
    return ( (self.r - other.r)**2 + (self.g - other.g)**2 + (self.b - other.b)**2 )**0.5

  # This distance definition is a class method that takes two RgbColor objects:
  #   RgbColor.distbetween(color1, color2)
  @classmethod
  def distbetween(cls, color1, color2):
    """Returns the Euclidean distance between color1 and color2 in RGB space"""
    return ( (color1.r - color2.r)**2 + (color1.g - color2.g)**2 + (color1.b - color2.b)**2 )**0.5



  def to_str(self):
    """Returns the attributes in a 6-digit hex-format color string"""
    return str('#' + format(self.r, '02X') + format(self.g, '02X') + format(self.b, '02X'))

  def to_list(self):
    """Returns the attributes in the list [self.r, self.g, self.b]"""
    return [self.r, self.g, self.b]

  def to_dict(self):
    """Returns the attributes in a dict with 'r', 'g', 'b' as keys"""
    return {'r':self.r, 'g':self.g, 'b':self.b}


  def __iter__(self):
    return self

  def next(self):
    if self.current_att == 'r':
      self.current_att = 'g'
      return self.r
    elif self.current_att == 'g':
      self.current_att = 'b'
      return self.g
    elif self.current_att == 'b':
      self.current_att = None
      return self.b
    else:
      self.current_att = 'r'      # Resets the iterable
      raise StopIteration
