import { useState } from 'react';
import { Trash, PlusCircle, Save, Mail, Edit, DollarSign, Settings } from 'lucide-react';

// Import shadcn components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { SiteHeader } from '@/components/site-header'

export default function SettingsPage () {
  // Fee management state
  const [fees, setFees] = useState([
    { id: 1, name: 'Tuition Fee', amount: 5000, description: 'Basic tuition fee for semester' },
    { id: 2, name: 'Library Fee', amount: 500, description: 'Access to library resources' },
    { id: 3, name: 'Technology Fee', amount: 800, description: 'For tech resources and infrastructure' }
  ]);
  const [newFee, setNewFee] = useState({ name: '', amount: '', description: '' });
  const [editingFeeId, setEditingFeeId] = useState(null);
  
  // Email settings state
  const [emailSettings, setEmailSettings] = useState({
    senderName: 'Admin Office',
    senderEmail: 'admin@university.edu',
    smtpServer: 'smtp.university.edu',
    smtpPort: '587',
    username: 'admin@university.edu',
    password: '********'
  });
  
  // Email templates state
  const [emailTemplates, setEmailTemplates] = useState([
    { 
      id: 1, 
      name: 'Fee Reminder', 
      subject: 'Reminder: Outstanding Fee Payment',
      body: 'Dear {studentName},\n\nThis is a reminder that you have an outstanding fee payment of {amountDue} due by {dueDate}.\n\nPlease make the payment as soon as possible to avoid any late fees.\n\nRegards,\nAdmin Office'
    },
    { 
      id: 2, 
      name: 'Payment Confirmation', 
      subject: 'Payment Confirmation',
      body: 'Dear {studentName},\n\nThis is to confirm that we have received your payment of {amountPaid} for {feeName}.\n\nThank you for your prompt payment.\n\nRegards,\nAdmin Office'
    }
  ]);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  
  // Fee Management Functions
  const handleAddFee = () => {
    if (!newFee.name || !newFee.amount) return;
    
    const newFeeObj = {
      id: fees.length > 0 ? Math.max(...fees.map(f => f.id)) + 1 : 1,
      name: newFee.name,
      amount: parseFloat(newFee.amount),
      description: newFee.description
    };
    
    setFees([...fees, newFeeObj]);
    setNewFee({ name: '', amount: '', description: '' });
  };
  
  const handleDeleteFee = (id) => {
    setFees(fees.filter(fee => fee.id !== id));
  };
  
  const startEditFee = (fee) => {
    setEditingFeeId(fee.id);
    setNewFee({
      name: fee.name,
      amount: fee.amount,
      description: fee.description
    });
  };
  
  const handleUpdateFee = () => {
    if (!newFee.name || !newFee.amount) return;
    
    setFees(fees.map(fee => 
      fee.id === editingFeeId ? 
      { ...fee, name: newFee.name, amount: parseFloat(newFee.amount), description: newFee.description } : 
      fee
    ));
    
    setEditingFeeId(null);
    setNewFee({ name: '', amount: '', description: '' });
  };
  
  // Email Settings Functions
  const handleEmailSettingChange = (e) => {
    setEmailSettings({
      ...emailSettings,
      [e.target.name]: e.target.value
    });
  };
  
  // Email Template Functions
  const handleSelectTemplate = (template) => {
    setActiveTemplate(template);
    setEditingTemplate({
      ...template
    });
  };
  
  const handleTemplateChange = (e) => {
    setEditingTemplate({
      ...editingTemplate,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSaveTemplate = () => {
    if (!editingTemplate || !editingTemplate.name || !editingTemplate.subject || !editingTemplate.body) return;
    
    if (activeTemplate) {
      // Update existing template
      setEmailTemplates(emailTemplates.map(template => 
        template.id === activeTemplate.id ? editingTemplate : template
      ));
    } else {
      // Add new template
      const newTemplate = {
        ...editingTemplate,
        id: emailTemplates.length > 0 ? Math.max(...emailTemplates.map(t => t.id)) + 1 : 1
      };
      setEmailTemplates([...emailTemplates, newTemplate]);
    }
    
    setActiveTemplate(null);
    setEditingTemplate(null);
  };
  
  const handleAddNewTemplate = () => {
    setActiveTemplate(null);
    setEditingTemplate({
      name: '',
      subject: '',
      body: ''
    });
  };
  
  const handleDeleteTemplate = (id) => {
    setEmailTemplates(emailTemplates.filter(template => template.id !== id));
    if (activeTemplate && activeTemplate.id === id) {
      setActiveTemplate(null);
      setEditingTemplate(null);
    }
  };

  return (
    <div>
         <SiteHeader title="Settings" />
    <div className="container mx-auto py-6 px-4">
      {/* <div className="flex items-center mb-6">
        <Settings className="mr-2" size={28} />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div> */}
      
      <Tabs defaultValue="fees" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="fees" className="flex items-center">
            <DollarSign className="mr-2 h-4 w-4" />
            Fee Management
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center">
            <Mail className="mr-2 h-4 w-4" />
            Email Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>Fee Management</CardTitle>
              <CardDescription>Add, edit, or remove fees for students</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Fee Form */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{editingFeeId ? 'Edit Fee' : 'Add New Fee'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="feeName">Fee Name</Label>
                      <Input 
                        id="feeName"
                        value={newFee.name}
                        onChange={(e) => setNewFee({...newFee, name: e.target.value})}
                        placeholder="e.g. Tuition Fee"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feeAmount">Amount</Label>
                      <Input 
                        id="feeAmount"
                        type="number"
                        value={newFee.amount}
                        onChange={(e) => setNewFee({...newFee, amount: e.target.value})}
                        placeholder="e.g. 5000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feeDescription">Description</Label>
                      <Input 
                        id="feeDescription"
                        value={newFee.description}
                        onChange={(e) => setNewFee({...newFee, description: e.target.value})}
                        placeholder="e.g. Basic tuition fee for semester"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  {editingFeeId ? (
                    <Button onClick={handleUpdateFee}>
                      <Save className="mr-2 h-4 w-4" />
                      Update Fee
                    </Button>
                  ) : (
                    <Button onClick={handleAddFee}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Fee
                    </Button>
                  )}
                </CardFooter>
              </Card>
              
              <Separator className="my-6" />
              
              {/* Fee List */}
              <Table>
                <TableCaption>List of all fees in the system</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fees.map(fee => (
                    <TableRow key={fee.id}>
                      <TableCell className="font-medium">{fee.name}</TableCell>
                      <TableCell>${fee.amount.toFixed(2)}</TableCell>
                      <TableCell>{fee.description}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-blue-600"
                          onClick={() => startEditFee(fee)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600"
                          onClick={() => handleDeleteFee(fee.id)}
                        >
                          <Trash size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {fees.length === 0 && (
                    <TableRow>
                      <TableCell colSpan="4" className="text-center text-gray-500">No fees added yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>Configure email settings and manage email templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* SMTP Settings */}
              {/* <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SMTP Settings</CardTitle>
                  <CardDescription>Configure email server settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="senderName">Sender Name</Label>
                      <Input 
                        id="senderName" 
                        name="senderName"
                        value={emailSettings.senderName}
                        onChange={handleEmailSettingChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderEmail">Sender Email</Label>
                      <Input 
                        id="senderEmail" 
                        name="senderEmail"
                        type="email"
                        value={emailSettings.senderEmail}
                        onChange={handleEmailSettingChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpServer">SMTP Server</Label>
                      <Input 
                        id="smtpServer" 
                        name="smtpServer"
                        value={emailSettings.smtpServer}
                        onChange={handleEmailSettingChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input 
                        id="smtpPort" 
                        name="smtpPort"
                        value={emailSettings.smtpPort}
                        onChange={handleEmailSettingChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        name="username"
                        value={emailSettings.username}
                        onChange={handleEmailSettingChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input 
                        id="password" 
                        name="password"
                        type="password"
                        value={emailSettings.password}
                        onChange={handleEmailSettingChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>
              
              <Separator /> */}
              
              {/* Email Templates */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Email Templates</h3>
                  <Button 
                    onClick={handleAddNewTemplate}
                    size="sm"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Template
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Template List */}
                  <Card className="col-span-1">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Available Templates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {emailTemplates.map(template => (
                          <div 
                            key={template.id}
                            className={`flex justify-between items-center p-2 rounded-md cursor-pointer ${activeTemplate && activeTemplate.id === template.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
                            onClick={() => handleSelectTemplate(template)}
                          >
                            <span className="font-medium">{template.name}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTemplate(template.id);
                              }}
                            >
                              <Trash size={14} />
                            </Button>
                          </div>
                        ))}
                        {emailTemplates.length === 0 && (
                          <div className="text-center text-gray-500 py-6">No templates yet.</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Template Editor */}
                  <Card className="col-span-2">
                    <CardContent className="pt-6">
                      {editingTemplate ? (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="templateName">Template Name</Label>
                            <Input 
                              id="templateName" 
                              name="name"
                              value={editingTemplate.name}
                              onChange={handleTemplateChange}
                              placeholder="e.g. Fee Reminder"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="templateSubject">Subject Line</Label>
                            <Input 
                              id="templateSubject" 
                              name="subject"
                              value={editingTemplate.subject}
                              onChange={handleTemplateChange}
                              placeholder="e.g. Reminder: Outstanding Fee Payment"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="templateBody">Email Body</Label>
                            <p className="text-xs text-gray-500">
                              You can use placeholders like {"{studentName}"}, {"{amountDue}"}, etc.
                            </p>
                            <Textarea 
                              id="templateBody" 
                              name="body"
                              value={editingTemplate.body}
                              onChange={handleTemplateChange}
                              placeholder="Enter email template content here..."
                              className="min-h-40"
                            />
                          </div>
                          <div className="flex justify-end">
                            <Button onClick={handleSaveTemplate}>
                              <Save className="mr-2 h-4 w-4" />
                              Save Template
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground min-h-40">
                          <Mail className="h-12 w-12 mb-4 opacity-50" />
                          <p>Select a template to edit or create a new one</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
}