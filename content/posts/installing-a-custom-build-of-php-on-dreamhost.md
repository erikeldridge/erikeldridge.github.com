---
_edit_last: "5360656"
_last_editor_used_jetpack: block-editor
author: erikeldridge
categories:
  - technical-tools
date: "2008-11-27T08:50:14+00:00"
guid: http://erikeldridge.wordpress.com/?p=153
parent_post_id: null
post_id: "153"
title: installing a custom build of PHP on Dreamhost
url: /2008/11/27/installing-a-custom-build-of-php-on-dreamhost/

---
**motivation**

To run an OpenID consumer library, e.g. [JanRain's PHP lib](http://openidenabled.com/php-openid/) and [Pádraic Brady's pear lib](http://pear.php.net/pepr/pepr-proposal-show.php?id=500), on Dreamhost

**intended audience**

Anyone familiar with:

- Command-line build
- shell scripting
- running PHP as CGI process

**references**

- [Dreamhost's wiki page on the subject](http://wiki.dreamhost.com/PHP_5_install_script)
- The LegHumped blog post, "[Idiots Guide to Installing PHP](http://leghumped.com/blog/2008/01/24/idiots-guide-to-installing-php/)"
- The Rotacoo post on "[How-to set up OpenID for Wordpress](http://rotacoo.com/how-to-set-up-openid-for-wordpress-comments)", which links to a [Dreamhost forum discussion](http://discussion.dreamhost.com/showflat.pl?Cat=&Board=forum_programming&Number=78146) of the topic

**notes**

- I broke the basic script into 3 pieces: getting, unpacking, and installing.  This way we can re-install a package without re-getting the source code it or re-building it.
- The syntax highlighting on Wordpress does not support shell scripting, so it's a bit off, but it helps
- The scripts presented here were used to successfully get, build, and install PHP5, but I have not yet stopped to figure out how to run it, so there may be a huge, as-yet-unknown bug looming in the near future, but for now I'm riding high from the successful build and RUN - it works too! :)
- This build configuration results in the following (non-fatal) error message:
  \+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+\+
  \+ Building in NON-COMPLIANCE with RFC 3501 security requirements:
  \+ Non-compliant:
  \+\+ TLS/SSL encryption is NOT supported
  \+\+ Unencrypted plaintext passwords are permitted
  \+
  \+ In order to rectify this problem, you MUST build with:
  \+\+ SSLTYPE=nopwd
  \+ You must also have OpenSSL or equivalent installed.
  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  I haven't sorted this out yet, so please post a comment if your familiar with what this is about.

**script**

\[sourcecode lang="PHP"\]
#!/bin/sh

#part 1: get the source code

set -e

\# build dir
SRCDIR=${HOME}/src

PHP5="php-5.2.5"
LIBICONV="libiconv-1.11"
LIBMCRYPT="libmcrypt-2.5.7"
LIBXML2="libxml2-2.6.32"
LIBXSLT="libxslt-1.1.24"
MHASH="mhash-0.9.7.1"
ZLIB="zlib-1.2.3"
CURL="curl-7.14.0"
LIBIDN="libidn-0.6.8"
CCLIENT="imap-2004g"
CCLIENT\_DIR="imap-2004g" # Another pest!
FREETYPE="freetype-2.2.1"
OPENSSL="openssl-0.9.8i"
GMP="gmp-4.2.4"

\# Pre-download clean up!!!!
rm -rf $SRCDIR

mkdir -p ${SRCDIR}

cd ${SRCDIR}

\# Get all the required packages
echo "Wgetting ..."

wget -c http://us.php.net/get/${PHP5}.tar.gz/from/this/mirror
wget -c "http://mirrors.usc.edu/pub/gnu/libiconv/${LIBICONV}.tar.gz
wget -c http://easynews.dl.sourceforge.net/sourceforge/mcrypt/${LIBMCRYPT}.tar.gz
wget -c ftp://xmlsoft.org/libxml2/${LIBXML2}.tar.gz
wget -c ftp://xmlsoft.org/libxml2/${LIBXSLT}.tar.gz
wget -c http://superb-west.dl.sourceforge.net/sourceforge/mhash/${MHASH}.tar.gz
wget -c http://www.zlib.net/${ZLIB}.tar.gz
wget -c http://curl.haxx.se/download/${CURL}.tar.gz
wget -c http://kent.dl.sourceforge.net/sourceforge/freetype/${FREETYPE}.tar.gz
wget -c ftp://alpha.gnu.org/pub/gnu/libidn/${LIBIDN}.tar.gz
wget -c ftp://ftp.cac.washington.edu/imap/old/${CCLIENT}.tar.Z
wget -c http://www.openssl.org/source/${OPENSSL}.tar.gz
wget -c http://www.openssl.org/source/${OPENSSL}.tar.gz
wget -c ftp://ftp.gnu.org/gnu/gmp/${GMP}.tar.gz

echo "Done!"
\[/sourcecode\]

\[sourcecode lang="PHP"\]
#!/bin/sh

#part 2: unpack

set -e

\# build dir
SRCDIR=${HOME}/src
LIBDIR=${HOME}/lib

\# Update version information here.
PHP5="php-5.2.5"
LIBICONV="libiconv-1.11"
LIBMCRYPT="libmcrypt-2.5.7"
LIBXML2="libxml2-2.6.32"
LIBXSLT="libxslt-1.1.24"
MHASH="mhash-0.9.7.1"
ZLIB="zlib-1.2.3"
CURL="curl-7.14.0"
LIBIDN="libidn-0.6.8"
CCLIENT="imap-2004g"
CCLIENT\_DIR="imap-2004g" # Another pest!
FREETYPE="freetype-2.2.1"
OPENSSL="openssl-0.9.8i"
GMP="gmp-4.2.4"

\# Pre-unpack clean up
function cleanup(){
echo "removing ${LIBDIR}/${1}"
rm -rf $LIBDIR/$1
mkdir -p $LIBDIR/$PHP5
echo Done.
}

#note: rename imap-2004g.tar.Z to imap-2004g.tar.gz in advance
function unpack(){
echo Extracting $1
cp $SRCDIR/$1.tar.gz $1.tar.gz
tar xzf $1.tar.gz
rm $1.tar.gz
echo Done.
}

echo "Cleaning up ... "

cleanup $PHP5
cleanup $LIBICONV
cleanup $LIBMCRYPT
cleanup $LIBXML2
cleanup $LIBXSLT
cleanup $MHASH
cleanup $ZLIB
cleanup $CURL
cleanup $LIBIDN
cleanup $CCLIENT
cleanup $CCLIENT\_DIR
cleanup $FREETYPE
cleanup $OPENSSL
cleanup $GMP

echo "Unpacking ... "

cd $LIBDIR

unpack ${PHP5}
unpack $LIBICONV
unpack $LIBMCRYPT
unpack $LIBXML2
unpack $LIBXSLT
unpack $MHASH
unpack $ZLIB
unpack $CURL
unpack $LIBIDN
unpack $CCLIENT
unpack $CCLIENT\_DIR
unpack $FREETYPE
unpack $OPENSSL
unpack $GMP

echo "Done!"
\[/sourcecode\]

\[sourcecode lang="PHP"\]
#!/bin/sh

#part 3: install

set -e

\# build dir
SRCDIR=${HOME}/src
INSTALLDIR=${HOME}/bin
DOMAIN="example.com"
LIBDIR=${HOME}/lib

\# Update version information here.
PHP5="php-5.2.5"
LIBICONV="libiconv-1.11"
LIBMCRYPT="libmcrypt-2.5.7"
LIBXML2="libxml2-2.6.32"
LIBXSLT="libxslt-1.1.24"
MHASH="mhash-0.9.7.1"
ZLIB="zlib-1.2.3"
CURL="curl-7.14.0"
LIBIDN="libidn-0.6.8"
CCLIENT="imap-2004g"
CCLIENT\_DIR="imap-2004g" # Another pest!
FREETYPE="freetype-2.2.1"
OPENSSL="openssl-0.9.8i"
GMP="gmp-4.2.4"

\# What PHP features do you want enabled?
PHPFEATURES="--prefix=${INSTALLDIR}/php5 \
--with-config-file-path=${INSTALLDIR}/conf/php5/${DOMAIN} \
--enable-fastcgi \
--enable-force-cgi-redirect \
--with-xml \
--with-libxml-dir=${INSTALLDIR} \
--with-freetype-dir=${INSTALLDIR} \
--enable-soap \
--with-openssl=${INSTALLDIR} \
--with-mhash=${INSTALLDIR} \
--with-mcrypt=${INSTALLDIR} \
--with-zlib-dir=${INSTALLDIR} \
--with-jpeg-dir=/usr \
--with-png-dir=/usr \
--with-gd \
--enable-gd-native-ttf \
--enable-memory-limit \
--enable-ftp \
--enable-exif \
--enable-sockets \
--enable-wddx \
--with-iconv=${INSTALLDIR} \
--enable-sqlite-utf8 \
--enable-calendar \
--with-curl=${INSTALLDIR} \
--enable-mbstring \
--enable-mbregex \
--enable-bcmath \
--with-mysql=/usr \
--with-mysqli \
--with-pear \
--with-gettext \
--with-imap=${INSTALLDIR} \
--without-imap-ssl \
--with-gmp={INSTALLDIR}"
#the --with-gmp flag is important to avoid this error:
#"GNU MP Library version 4.1.2 or greater required."
#See http://leghumped.com/php\_inst.sh
#& DH forum http://discussion.dreamhost.com/showflat.pl?Cat=&Board=forum\_programming&Number=78146

echo "Installing ..."

#libiconv
cd ${LIBDIR}/${LIBICONV}
./configure --enable-extra-encodings --prefix=${INSTALLDIR}
\# make clean
make
make install

#libxml2
cd ${LIBDIR}/${LIBXML2}
./configure --with-iconv=${INSTALLDIR} --prefix=${INSTALLDIR}
\# make clean
make
make install

#libxslt
cd ${LIBDIR}/${LIBXSLT}
./configure --prefix=${INSTALLDIR} \
--with-libxml-prefix=${INSTALLDIR} \
--with-libxml-include-prefix=${INSTALLDIR}/include/ \
--with-libxml-libs-prefix=${INSTALLDIR}/lib/
\# make clean
make
make install

#zlib
cd ${LIBDIR}/${ZLIB}
./configure --shared --prefix=${INSTALLDIR}
\# make clean
make
make install

#libmcrypt
cd ${LIBDIR}/${LIBMCRYPT}
./configure --disable-posix-threads --prefix=${INSTALLDIR}
\# make clean
make
make install

#libmcrypt lltdl issue!!
cd ${LIBDIR}/${LIBMCRYPT}/libltdl
./configure --prefix=${INSTALLDIR} --enable-ltdl-install
\# make clean
make
make install

#mhash
cd ${LIBDIR}/${MHASH}
./configure --prefix=${INSTALLDIR}
\# make clean
make
make install

#freetype
cd ${LIBDIR}/${FREETYPE}
./configure --prefix=${INSTALLDIR}
\# make clean
make
make install

#libidn
cd ${LIBDIR}/${LIBIDN}
./configure --with-iconv-prefix=${INSTALLDIR} --prefix=${INSTALLDIR}
\# make clean
make
make install

#cURL
cd ${LIBDIR}/${CURL}
./configure --with-ssl=${INSTALLDIR} --with-zlib=${INSTALLDIR} \
--with-libidn=${INSTALLDIR} --enable-ipv6 --enable-cookies \
--enable-crypto-auth --prefix=${INSTALLDIR}
\# make clean
make
make install

\# c-client
cd ${LIBDIR}/${CCLIENT\_DIR}
make -i ldb SSLTYPE=none
\# Install targets are for wusses!
cp c-client/c-client.a ${INSTALLDIR}/lib/libc-client.a
cp c-client/\*.h ${INSTALLDIR}/include

#OpenSSL
cd ${LIBDIR}/${OPENSSL}
./config --prefix=${INSTALLDIR} --openssldir=${INSTALLDIR}
make
make install

\# gmp
cd ${LIBDIR}/${GMP}
#--prefix=${INSTALLDIR} --libdir=${INSTALLDIR}/lib req'd to avoid error:
#"configure: error: Unable to locate gmp.h"
#credit: http://leghumped.com/php\_inst.sh
./configure --prefix=${INSTALLDIR} --libdir=${INSTALLDIR}/lib
\# make clean
make
make install

#PHP 5
cd ${LIBDIR}/${PHP5}
LDFLAGS="-L${INSTALLDIR}"
./configure ${PHPFEATURES}
\# make clean
make
make install

#copy config file
mkdir -p ${HOME}/conf/php5/${DOMAIN}
cp ${LIBDIR}/${PHP5}/php.ini-dist ${HOME}/conf/php5/${DOMAIN}/php.ini

#copy PHP CGI
mkdir -p ${HOME}/${DOMAIN}/cgi-bin
chmod 0755 ${HOME}/${DOMAIN}/cgi-bin
cp ${INSTALLDIR}/php5 ${HOME}/${DOMAIN}/cgi-bin/php5.cgi

echo "Done!"
\[/sourcecode\]

After obtaining and unpacking the requisite files and compiling PHP, tell Apache where to find PHP by putting the following in an .htaccess file located in your domain's root directory (credit: [LegHumped](http://leghumped.com/blog/2008/01/24/idiots-guide-to-installing-php/)):
\[sourcecode lang="PHP"\]
Options +ExecCGI
AddHandler php-cgi .php
Action php-cgi /cgi-bin/php.cgi
\[/sourcecode\]

Good luck!!!
